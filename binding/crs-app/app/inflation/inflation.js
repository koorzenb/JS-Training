import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Inflation extends ViewBase {
    async connectedCallback() {
        await super.connectedCallback();
        this.initTemplate();
        this.createDataStruct();
    }

    initTemplate() {
        this.mainWindow = document.querySelector("crs-router")


    }

    dispose() {
        this.mainWindow = null;
    }


    createDataStruct() {
        const data = [
            {
                name: "John",
                lastName: "Doe",
                role: {
                    foreman: true,
                    admin: false,
                    lineManager: false
                }
            },
            {
                name: "Peter",
                lastName: "Smith",
                role: {
                    foreman: true,
                    admin: true,
                    lineManager: false
                }
            },
            {
                name: "Adam",
                lastName: "Ranger",
                role: {
                    foreman: false,
                    admin: false,
                    lineManager: true
                }
            }
        ]
    }
}