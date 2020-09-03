import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";
// import { getRenderData } from "./model.js";

// Expressions: https://github.com/caperaven/crs-binding-documentation/blob/master/3.%20binding-expressions.md
// Project: https://github.com/caperaven/training/blob/master/binding/02.simple-binding.md

export default class Inflation extends ViewBase {

    load() {
        crsbinding.data.updateUI(this._dataId, "label");
        // crsbinding.data.updateUI(this._dataId, "data");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        const data = {
            firstName: "John",
            lastName: "Doe",
            age: 20
        }
        
        const label = {
            firstName: "First Name",
            lastName: "First Name",
            age: "Age"
        }

        // setPropertyCallback("data", data);
        setPropertyCallback("label", label);
        console.log(label);

        // TODO: compare to inflation and create buttons
    }

    getRenderData() {    

        people.forEach(item => {
            result.push({id: item.id, title: item.title, type:"person"});
            result.push({person: item.id, trade: 0, value: item.trades["0"], type:"cell"});
            result.push({person: item.id, trade: 1, value: item.trades["1"], type:"cell"});
            result.push({person: item.id, trade: 2, value: item.trades["2"], type:"cell"});
        });

        return result;
    }
}