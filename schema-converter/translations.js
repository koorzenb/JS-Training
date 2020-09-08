import {promises} from "fs";
import * as walker from "walkdir";
import * as path from "path";
import {types, allTypes} from "./schema-types.js";

export class Translations {
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
            const resources = [];

            const emitter = walker.default.walk(this.config.folder, (path) => {
                path.includes(".json") && resources.push(path);
            });

            emitter.on("end", () => {
                resolve(resources);
            });

            emitter.on("error", () => reject());
            emitter.on("fail", () => resolve());
        });
    }

    async getFileGroups(resources) {
        const files = new Map();

        for (const resource of resources) {
            const file = path.basename(resource);
            const directory = path.dirname(resource);

            let isKnownType = false;
            let resourceName = file;

            for (const type of types) {
                if (file.indexOf(type) != -1) {
                    resourceName = resourceName.replace(type, "");
                    isKnownType = true;
                }
            }

            resourceName = resourceName.replace(".json", "");

            if (isKnownType == false) continue;

            const body = {
                directory,
                files: {}
            };

            for (const type of fullNames) {
                const schema = `${resourceName}${type}.json`;
                body.files[type] = schema;
            }

            files.set(resourceName, body);
        }

        return files;
    }

    async processGroupsGetAllTranslations(files) {
        const entries = Array.from(files.entries());
        const allTranslations = {};

        for (const entry of entries) {
            //const resource = entry[0];
            const options = entry[1];

            for (const key in options.files) {
                const file = options.files[key];
                const path = `${options.directory}\\${file}`;

                const schemaFile = await this.fetchSchema(path);
                if (schemaFile == null) continue;

                const translations = await this.extractTranslations(schemaFile);

                for (const key in translations) {
                    //duplicate translations
                    //allTranslations[key] != null && console.log(`Key already exists ${key} existing value ${allTranslations[key]} new value ${translations[key]}`);
                    allTranslations[key] = translations[key];
                }
            }
        }

        return allTranslations;
    }

    async processAllLookupTranslations(files, allTranslations) {
        const entries = Array.from(files.entries());

        for (const entry of entries) {
            const resource = entry[0];
            const options = entry[1];

            const path = `${options.directory}\\${resource}Lookups.json`;

            const schemaFile = await this.fetchSchema(path);
            if (schemaFile == null) continue;

            const missing = await this.getMissingTranslations(schemaFile);
            if (missing.length < 1) continue;

            await this.applyMissing(schemaFile, missing, allTranslations);
            await this.writeSchema(schemaFile, path, schemaFile.resource);
        }
    }

    async applyMissing(schema, missing, allTranslations) {
        for (const item of missing) {
            const itemParts = item.split(".");
            const key = itemParts[itemParts.length -1];

            const translation = allTranslations[key];
            translation == null && console.log(`Translation missing ${key} ${schema.resource} ${schema.type}`);
            const path = item.replace("schema.", "");
            await this.setNestedProperty(schema, path, translation);
        }
    }

    async getMissingTranslations(schema) {
        const translations = await this.getNestedProperties(schema, "@translations");
        const missing = [];

        for (const translation of translations) {
            const path = translation.replace("@", "schema.variables.");
            const fn = new Function("schema", `return ${path}`);
            const res = fn(schema);
            res == null && missing.push(path);
        }

        return missing;
    }

    async extractTranslations(schema) {
        const translations = ((schema.variables || {}).translations || {});
        const flat = await this.flattenStructure(translations);
        return flat;
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

    async deepEqual(obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    }

    async flattenStructure(obj, result) {
        result == null && (result = {});
        for (const key in obj) {
            if ((obj[key] instanceof Array || obj[key] instanceof Object) === false) {
                //duplicate keys per file not that bad
                //result[key] != null && console.log(`Key already exists ${key} existing value ${result[key]} new value ${obj[key]}`);
                result[key] = obj[key];
            } else {
                await this.flattenStructure(obj[key], result);
            }
        }
        return result;
    }

    async setNestedProperty(obj, path, value) {
        typeof(path) == "string" && (path = path.split("."));
        
        const pathKey = path[0];
        path = path.splice(1);

        if (path.length != 0) {
            obj[pathKey] == null && (obj[pathKey] = {});
            await this.setNestedProperty(obj[pathKey], path, value);
        } else {
            obj[pathKey] = value;
        }

    }

    async getNestedProperties(obj, searchText, result) {
        result == null && (result = []);
        for (const key in obj) {
            if ((obj[key] instanceof Array || obj[key] instanceof Object) === false) {
                (obj[key] || "").toString().includes(searchText) && result.push(obj[key]);
            } else {
                await this.getNestedProperties(obj[key], searchText, result);
            }
        }
        return result;
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

    async writeSchema(schema, path, resource) {
        schema.resource = resource;
        const schemaData = JSON.stringify(schema, null, 2);
        await promises.writeFile(path, schemaData, {encoding: "utf8"}).catch((error) => {
            console.error("Could not write schema back", error, schema.resource, schema.type);
        });
    }

    async fetchSchema(file) {
        const result = await this.readTemplate(file);
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