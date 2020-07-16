import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Inflation extends ViewBase {

    _loaded() {
        crsbinding.data.updateUI(this._dataId, "items");
        super._loaded();
    }

    newItem() {
        const items = crsbinding.data.array(this,"items");
        const title = prompt("Title", `Item ${items.length + 1}`);
        items.push({title});
        console.log(crsbinding.data.getValue(5,"items"));
    }

    removeItem() {}

    editFirst() {
        console.log("editting")
    }


    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", [
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
        ])
    }
}