import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Welcome extends ViewBase {

    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", [
            {
                title: "Big Boss"
            },
            {
                title: "Small Boss"
            },
            {
                title: "Little Boss"
            }
        ]);
    }

    _loaded() {
        crsbinding.data.updateUI(this._dataId,"items");
        super._loaded();
    }

    add() {
        const array = crsbinding.data.array(this,"items");
        array.push({title: "barend"});
        console.log(crsbinding.data.getValue(5,"items"));
    }
}