import {promises} from "fs";
import * as walker from "walkdir";
import * as path from "path";

export class Update {
    constructor() {

    }

    dispose() {

    }

    async setup() {
        const configText = await promises.readFile("./config.json", {encoding: "utf8"});
        this.config = JSON.parse(configText);
    }

    async walk() {
        return new Promise((resolve, reject) => {
            const dashbaords = [];

            const emitter = walker.default.walk(this.config.folder, (path) => {
                path.includes("Dashboard.json") && path.includes("Assist") === false && dashbaords.push(path);
            });

            emitter.on("end", () => {
                this.dashbaords = dashbaords;
                resolve(dashbaords);
            });

            emitter.on("error", () => reject());
            emitter.on("fail", () => resolve());
        });
    }

    async getFileGroups() {
        const files = new Map();

        for (const dashboard of this.dashbaords) {
            const file = path.basename(dashboard);
            const directory = path.dirname(dashboard);
            const resource = file.replace("Dashboard.json", "");

            const create = `${resource}Create.json`;
            const update = `${resource}Update.json`;
            const lookup = `${resource}Lookups.json`;

            files.set(resource, {directory, dashboard: file, create, update, lookup});
        }

        this.fileGroups = files;
    }

    async processGroups() {
        const entries = Array.from(this.fileGroups.entries());

        for (const entry of entries) {
            const options = entry[1];
            const update = `${options.directory}\\${options.update}`;

            const updateSchema = await this.fetchSchema(update);
            const changed = await this.addBatchOperations(updateSchema);
            changed === true && this.writeSchema(updateSchema, update, updateSchema.resource);
        }
    }

    async addBatchOperations(schema) {
        if (schema == null || schema.datasources == null) return;
        let change = false;
        const datasources = schema.datasources;

        for (const datasource of datasources) {
            if (datasource.remote == null || datasource.primaryActions == null) continue;

            const parameterKeys = Object.keys(datasource.parameters);
            const key = parameterKeys[0];
            const parameter = datasource.parameters[key];
            const keyParts = key.split("->");
            const propertyPath = keyParts[1];
            const property = propertyPath.replace("_", "");
            let final = property[0].toLowerCase() + property.slice(1);
            
            let found = false;

            for (const parameterName in (datasource.primaryActions.create || {parameters: []}).parameters) {
                if (datasource.primaryActions.create.parameters[parameterName] === parameter) {
                    final = parameterName;
                    found = true;
                    break;
                }
            }

            if (found === false) {
                for (const parameterName in (datasource.primaryActions.navigate || {parameters: []}).parameters) {
                    if (datasource.primaryActions.navigate.parameters[parameterName] === parameter) {
                        final = parameterName;
                        found = true;
                        break;
                    }
                }
            }
   
            if (found == false) {
                console.log(`Could not find parameter in ${schema.resource} ${schema.type} datasource ${datasource.remote}`);
                continue;
            }

            await this.addPrimaryAction("batch-create", "BatchCreate", datasource, final, parameter);
            await this.addPrimaryAction("batch-update", "BatchUpdate", datasource, final, parameter);
            change = true;
        }
        return change;
    }

    async addPrimaryAction(action, method, datasource, final, parameter) {
        datasource.primaryActions[action] == null && (datasource.primaryActions[action] = {});
        datasource.primaryActions[action].action = `${method}${datasource.remote}`;
        datasource.primaryActions[action].parameters == null && (datasource.primaryActions[action].parameters = {});
        datasource.primaryActions[action].parameters[final] = parameter;
    }

    async fetchSchema(file) {
        const result = await this.readTemplate(file);
        return result.data;
    }

    async writeSchema(schema, path, resource) {
        schema.resource = resource;
        const schemaData = JSON.stringify(schema, null, 2);
        await promises.writeFile(path, schemaData, {encoding: "utf8"}).catch((error) => {
            console.error("Could not write schema back", error, schema.resource, schema.type);
        });
    }

    async readTemplate(file) {
        const result = {
            data: null,
            error: null
        }
        const template = await promises.readFile(file, {encoding: "utf8"}).catch((error) => {
            result.error = error;
        });

        try {
            template && (result.data = JSON.parse(template.trim()));
        }
        catch (error) {
            result.error = error;
        }

        return result;
    }
}