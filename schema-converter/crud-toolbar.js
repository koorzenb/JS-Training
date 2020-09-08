import * as path from "path";
import {types, allTypes, crudToolbarOrder} from "./schema-types.js";
import {fileLibrary} from "./lib/file.js";
import {schemaLibrary} from "./lib/schema.js";
import {objectLibrary} from "./lib/object.js";

export class CrudToolbar {
    constructor() {

    }

    dispose() {

    }

    async setup() {
        debugger;
        const configResult = await fileLibrary.readJson("./config.json");
        this.config = configResult.data;
    }

    async walk() {
        return await fileLibrary.walkDirectory(this.config.folder, [".json"]);
    }

    async getFileGroups(files) {
        const fileGroups = new Map();

        for (const file of files) {
            const fileName = path.basename(file);
            const directory = path.dirname(file);

            let isKnownType = false;
            let resourceName = fileName;

            const applicableTypes = Object.values(types).filter(t => fileName.includes(t));

            if (applicableTypes && applicableTypes.length > 0) {
                applicableTypes.map(t => {
                    resourceName = resourceName.replace(t, "");
                    isKnownType = true;
                });
            }

            resourceName = resourceName.replace(".json", "");

            if (isKnownType == false) continue;

            const body = {
                directory,
                files: {}
            };

            for (const typeKey in allTypes) {
                const type = allTypes[typeKey];
                const schema = `${resourceName}${type}.json`;
                body.files[type] = schema;
            }

            fileGroups.set(resourceName, body);
        }

        return fileGroups;
    }

    async processGroups(files, filter) {
        const entries = Array.from(files.entries());

        for (const entry of entries) {
            //const resource = entry[0];
            const options = entry[1];

            for (const key in options.files) {
                if (filter.includes(key) == false) continue;

                const file = options.files[key];
                const path = `${options.directory}\\${file}`;

                const schemaFile = await schemaLibrary.fetchSchema(path, fileLibrary);
                if (schemaFile == null || schemaFile.isCustom == true) continue;

                this[key] && await this[key](schemaFile);
                await schemaLibrary.writeSchema(schemaFile, path, fileLibrary);
            }
        }
    }

    async Dashboard(schema) {
        const crudToolbars = await objectLibrary.getNestedObjectByProperty(schema, "dynamic-crud-toolbar");

        for (const toolbar of crudToolbars) {
            await this.moveButtonsToTemplate(toolbar.object, toolbar.parent, schema);
            await this.sortActions(toolbar.object);
        }
    }

    async DetailCollection(schema) {
        const crudToolbars = await objectLibrary.getNestedObjectByProperty(schema, "dynamic-crud-toolbar");

        for (const toolbar of crudToolbars) {
            await this.moveButtonsToTemplate(toolbar.object, toolbar.parent, schema);
            await this.addAction("inlineEditingDisabled", toolbar.object);
            await this.sortActions(toolbar.object);
        }
    }

    async sortActions(toolbar) {

        const compare = (a, b) => {
            const aIndex = crudToolbarOrder.indexOf(a);
            const bIndex = crudToolbarOrder.indexOf(b);
            return aIndex - bIndex;
        }

        toolbar.attributes.actions = toolbar.attributes.actions.sort(compare);
    }

    async addAction(action, toolbar) {
        toolbar.attributes.actions.includes(action) == false && (toolbar.attributes.actions.push(action));
    }

    async moveButtonsToTemplate(toolbar, parent, schema) {
        const toolBarIndex = parent.findIndex(e => e.element == "dynamic-crud-toolbar");

        if (parent.length == toolBarIndex) return;

        const elementsAfterCrudToolbar = parent.slice(toolBarIndex + 1);

        if (elementsAfterCrudToolbar.some(e => e.element != "button")) {
            console.error(`This toolbar has items which are not buttons. ${schema.resource} ${schema.type}`);
            return;
        }

        const elementsToMove = parent.splice(toolBarIndex + 1);

        if (toolbar.elements != null) {
            console.error(`This toolbar has content. ${schema.resource} ${schema.type}`);
            return;
        }

        if (elementsToMove.length == 0) {
            return;
        }

        toolbar.elements = [
            {
                element: "html-template",
                attributes: {
                    type: "custom"
                },
                elements: [...elementsToMove]
            }
        ];
    }
}