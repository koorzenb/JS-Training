import {promises, appendFile} from "fs";
import * as walker from "walkdir";
import * as path from "path";

export class CreateAndUpdate {
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
            const create = [];

            const emitter = walker.default.walk(this.config.folder, (path) => {
                path.includes("Create.json") === true && path.includes("Assist") === false  && create.push(path);
            });

            emitter.on("end", () => {
                this.creates = create;
                resolve(create);
            });

            emitter.on("error", () => reject());
            emitter.on("fail", () => resolve());
        });
    }

    async getFileGroups() {
        const files = new Map();

        for (const create of this.creates) {
            const file = path.basename(create);
            const directory = path.dirname(create);
            const resource = file.replace("Create.json","");

            const dashboard = `${resource}Dashboard.json`;

            files.set(resource, {directory, create: file, dashboard});
        }

        this.fileGroups = files;
    }

    async processGroups() {
        const entries = Array.from(this.fileGroups.entries());

        for (const entry of entries) {
            const resource = entry[0];
            const options = entry[1];

            if(options.create.indexOf("Help") != -1) {
                console.log(`${options.create}: contains help file -> skipping`);
                continue;
            }

            const dashboard = `${options.directory}\\${options.dashboard}`;
            const create = `${options.directory}\\${options.create}`;

            const createSchema = await this.fetchSchema(create);

            if (createSchema == null) {
                console.log("No Create Schema for", resource);
                continue;
            }

            const isProcessed = JSON.stringify(createSchema).indexOf("labelButtonSaveAndUpdate") != -1;        
            if(isProcessed) {
                console.log(`already processed ${createSchema.resource} ${createSchema.type}`);
                continue;
            }


            const dashboardSchema = await this.fetchSchema(dashboard);


            // await this.writeSchema(createSchema, create, dashboardSchema.resource);

            this.addSaveAndUpdate(createSchema);
            console.log(`editted ${options.create}`);
        }
    }

    async addSaveAndUpdate(schema) {

        console.log(`updating ${schema.resource}`);
        const schemaClone = await this.clone(schema);

        // add translation to schema variables
        schemaClone.variables.translations.titles.saveAndUpdate = "Save and Update";
        // do error checking: if no translations or variables, output to list

        // add action
        let maxExistingId = schema.actions.length > 0 ? schema.actions.length + 1 : 1;
        const newAction = {
            "id": maxExistingId,
            "action": "context.saveAndUpdate",
            "parameters": {
                "activity-id": 10001
            }
            }

        console.log(schema.resource, schemaClone.actions);
        schemaClone.actions.push(newAction);

        // add button to group
        const newButton = {
            "element": "button",
            "title": "@translations.titles.labelButtonSaveAndUpdate",
            "action": 3,
            "attributes": {
              "data-action": 2
            }
        }

        // const footerIndex = schema.body.elements.findIndex(x => x.styles == "dialog-footer")
        // const footerArray = schema.body.elements[footerIndex]
        // footerArray.findIndex(x => x.element == "dropdown-button")

        // console.log(schema.body.elements[footerIndex][dropdownIndex]);

        // console.log(schema.body.elements);
    }

    async addLookupsToSchema(lookups, fromSchema, lookupSchema) {

        let maxExistingId = lookupSchema.lookups.length > 0 ? Math.max(...lookupSchema.lookups.map(o => o.id)) + 1 : 1;
        let id = maxExistingId;
        const datasetChanges = [];

        for (const lookup of lookups) {

            let lookupClone = JSON.parse(JSON.stringify(lookup));
            const datasource = fromSchema.datasources.find(o => o.id == lookup.datasource);

            if (datasource == null) {
                console.warn(`Lookup datasource missing for lookup ${lookupClone.id} ${lookupClone.name} in ${fromSchema.resource}${fromSchema.type}`);
                continue;
            }

            let datasourceClone = JSON.parse(JSON.stringify(datasource));

            const perspective = fromSchema.perspectives.find(o => o.id == lookup.perspective);
            let perspectiveClone = await this.clone(perspective);

            const template = fromSchema.templates.find(o => o.id == lookup.template);
            let templateClone = await this.clone(template);

            const existingLookup = await this.getExistingLookup(datasourceClone, lookupSchema);
            const existingDataSource = await this.getExistingDataSource(datasourceClone, lookupSchema);
            const existingPerspective = await this.getExistingPerspective(existingLookup, lookupSchema);
            const existingTemplate = await this.getExistingTemplate(existingLookup, lookupSchema);

            const lookupMappingEqual = await this.deepEqual((existingLookup || {}).mapping, lookupClone.mapping);
            const datasourceParametersEqual = await this.deepEqual((existingDataSource || {}).parameters, datasourceClone.parameters);
            const existingPerspectiveEqual = await this.deepCompareSchemaItems(perspective, existingPerspective, ["id"]);
            const exitingTemplateEqual = await this.deepCompareSchemaItems(template, existingTemplate, ["id", "perspective"]);

            const useExistingLookup = existingLookup != null &&
                lookupMappingEqual && datasourceParametersEqual && existingPerspectiveEqual && exitingTemplateEqual;

            if (useExistingLookup) {
                //This lookup datasource remote already exists
                lookupClone = existingLookup;
                datasetChanges.push({oldId: lookup.id, newId: lookupClone.id});
            } else {
                datasetChanges.push({oldId: lookup.id, newId: id});
                lookupClone.id = id;
                lookupSchema.lookups.push(lookupClone);
                await this.copyTranslation(lookupClone.title, fromSchema, lookupSchema, "lookup");
            }

            const useExistingDatasource = existingDataSource != null &&
                await this.deepEqual(datasourceClone.parameters, existingDataSource.parameters);
            if (useExistingDatasource) {
                //we will use an existing datasource
                datasourceClone = existingDataSource;
                lookupClone.datasource = datasourceClone.id;
            } else {
                datasourceClone.id = id;
                lookupClone.datasource = id;
                delete datasourceClone.perspective;
                lookupSchema.datasources.push(datasourceClone);
            }

            if (perspectiveClone != null) {
                const useExistingPerspective = existingPerspective != null && existingPerspectiveEqual;
                if (useExistingPerspective) {
                    perspectiveClone = existingPerspective;
                    lookupClone.perspective = perspectiveClone.id;
                } else {
                    perspectiveClone.id = id;
                    lookupClone.perspective = id;
                    lookupSchema.perspectives.push(perspectiveClone);
                }
            } else {
                console.warn(`Perspective missing for lookup ${lookupClone.id} ${lookupClone.name} in ${fromSchema.resource}${fromSchema.type}`);
            }

            const useExistingTemplate = existingTemplate != null && exitingTemplateEqual;
            if (useExistingTemplate) {
                templateClone = existingTemplate;
                lookupClone.template = templateClone.id;
                perspectiveClone != null && await this.updateNestedProperty(templateClone, "perspective", perspectiveClone.id);
            }
            else {
                templateClone.id = id;
                lookupClone.template = id;
                perspectiveClone != null && await this.updateNestedProperty(templateClone, "perspective", perspectiveClone.id);
                lookupSchema.templates.push(templateClone);
            }

            id++;
        }

        await this.updateDatasetReference(datasetChanges, "lookup", fromSchema);
        datasetChanges.length = 0;

        maxExistingId = lookupSchema.previews.length > 0 ? Math.max(...lookupSchema.previews.map(o => o.id)) + 1 : 1;
        id = maxExistingId;

        for (const preview of fromSchema.previews || []) {
            let previewClone = JSON.parse(JSON.stringify(preview));

            const existingPreview = lookupSchema.previews.find(o => o.remote == preview.remote);
            if (existingPreview != null) {
                previewClone = existingPreview;
                datasetChanges.push({oldId: preview.id, newId: previewClone.id});
            }
            else {
                previewClone.id = id;
                datasetChanges.push({oldId: preview.id, newId: id});
                lookupSchema.previews.push(previewClone);
                id++;
            }
        }

        this.updateDatasetReference(datasetChanges, "preview", fromSchema);
        datasetChanges.length = 0;
    }

    async clone(obj) {
        if (obj == null) return null;
        return JSON.parse(JSON.stringify(obj));
    }

    async deepCompareSchemaItems(schemaItem1, schemaItem2, propertiesToDelete) {

        if (schemaItem1 == null && schemaItem2 == null) return true;
        if (schemaItem1 != null && schemaItem2 == null) return false;
        if (schemaItem1 == null && schemaItem2 != null) return false;

        const clone1 = await this.clone(schemaItem1);
        const clone2 = await this.clone(schemaItem2);

        await this.deleteNestedProperty(clone1, propertiesToDelete);
        await this.deleteNestedProperty(clone2, propertiesToDelete);

        return await this.deepEqual(clone1, clone2);
    }

    async deleteNestedProperty(obj, properties) {
        for (const key in obj) {
            if (properties.includes(key)) {
                delete obj[key];
            } else {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    await this.deleteNestedProperty(obj[key], properties);
                }
            }
        }
    }

    async getExistingTemplate(lookup, schema) {
        return schema.templates.find(o => o.id == (lookup || {}).template);
    }

    async getExistingPerspective(lookup, schema) {
        return schema.perspectives.find(o => o.id == (lookup || {}).perspective);
    }

    async getExistingLookup(datasource, schema) {
        const existingDatasource = schema.datasources.find(o => o.remote == datasource.remote);
        const existingLookup = schema.lookups.find(o => o.datasource == (existingDatasource || {}).id);
        return existingLookup;
    }

    async getExistingDataSource(datasource, schema) {
        const existingDatasource = schema.datasources.find(o => o.remote == datasource.remote);
        return existingDatasource;
    }

    async deepEqual(obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    }

    async updateNestedProperty(obj, property, value) {
        for (const key in obj) {
            if (key == property) {
                obj[key] = value;
            } else {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    await this.updateNestedProperty(obj[key], property, value);
                }
            }
        }
    }

    async updateDatasetReference(changes, property, fromSchema) {

        for (const dataset of fromSchema.datasets) {
            for (const field of dataset.fields) {

                const change = changes.find(o => o.oldId == field[property]);

                if (change != null) {
                    field[property] = change.newId;
                }
            }
        }

        for (const process of fromSchema.processes || []) {
            for (const step of process.steps || []) {
                if (step.type == "lookup") {
                    const change = changes.find(o => o.oldId == step[property]);

                    if (change != null) {
                        step[property] = change.newId;
                    }
                }
            }
        }
    }

    async extractLookupData(fromSchema) {
        if (fromSchema == null || fromSchema.lookups == null) return [];
        return fromSchema.lookups;
    }

    async updatePrimaryActions(schema) {
        const datasource = schema.datasources.find(o => o.action && o.action.includes("Collection"));
        if (datasource == null) {
            return;
        }
        datasource.primaryActions == null && (datasource.primaryActions = {});
        const primaryActions = datasource.primaryActions;
        primaryActions["batch-create"] == null && (primaryActions["batch-create"] = {action: `BatchCreate${schema.resource}`});
        primaryActions["batch-update"] == null && (primaryActions["batch-update"] = {action: `BatchUpdate${schema.resource}`});
    }

    async deleteLookupData(schema) {

        for (const lookup of (schema.lookups || [])) {
            const datasourceIndex = schema.datasources.findIndex(o => o.id == lookup.datasource);
            datasourceIndex > -1 && schema.datasources.splice(datasourceIndex, 1);

            const perspectiveIndex = schema.perspectives.findIndex(o => o.id == lookup.perspective);
            perspectiveIndex > -1 && schema.perspectives.splice(perspectiveIndex, 1);

            const templateIndex = schema.templates.findIndex(o => o.id == lookup.template);
            templateIndex > -1 && schema.templates.splice(templateIndex, 1);
        }

        delete schema.lookups;
        delete schema.previews;
    }

    async writeSchema(schema, path, resource) {
        schema.resource = resource;
        const schemaData = JSON.stringify(schema, null, 2);
        await promises.writeFile(path, schemaData, {encoding: "utf8"}).catch((error) => {
            console.error("Could not write schema back", error, schema.resource, schema.type);
        });
    }

    async copyTranslation(key, fromSchema, toSchema, type) {
        if (key == null) {
            console.warn("Translation missing from", type, fromSchema.resource, fromSchema.type);
            return;
        }

        let path = key.replace("@", "").split(".");
        const fnReadText = "return fromSchema.variables." + path.join(".");
        const fnRead = new Function("fromSchema", fnReadText);
        const value = fnRead(fromSchema);

        path = path.map(o => `["${o}"]`);
        let depthFunctions = [];
        let previous = "toSchema.variables";
        for (const part of path) {
            depthFunctions.push(`${previous}${part} == null && (${previous}${part} = {});`);
            previous = `${previous}${part}`;
        }
        depthFunctions = depthFunctions.slice(0, depthFunctions.length - 1);

        const fnWriteText = `${depthFunctions.join("")}toSchema.variables${path.join("")} = "${value}"`;
        const fnWrite = new Function("toSchema", fnWriteText);
        fnWrite(toSchema);
    }

    async fetchSchema(file) {
        const result = await this.readTemplate(file);
        return result.data;
    }

    async createLookups() {
        const result = await this.readTemplate("./lookups-template.json");
        return result.data;
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