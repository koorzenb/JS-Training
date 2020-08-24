import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class SimpleArray extends ViewBase {

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

    removeItem() {
        // crsbinding.data.removeObject(7);    // doesnt remove from DOM
        const proxy = crsbinding.data.array(this,"items");
        for (const item of proxy) {
            const index = proxy.indexOf(item);
            if(item.isSelected === true) {
                // TODO: BK - need to use crsbinding property that will remove item?
                proxy.splice(index, 1);
            }
        }
    }

    editFirst() {
        const items = crsbinding.data.array(this,"items");
        crsbinding.data.setProperty(items[0], "title", "Hello World");
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", [
            {
                title: "Item 1",
                isDone: false
            }
        ])
    }
}