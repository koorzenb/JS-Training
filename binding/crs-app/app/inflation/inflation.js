import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";
// import { getRenderData } from "./model.js";

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
        for (const item of this.getRenderData()) {
            console.log(item.title || item.value);
            console.log(item);
            console.log(" ");
            set conditional binding <condition.if item.title!=null, then output, else item.value> on html 
        }
        setPropertyCallback("items", this.getRenderData());
    }

    // TODO: BK - Could not import getRenderData() from model.js  
    getRenderData() {
        /**
         * matrix       Foreman    Admin   Line Manager
         * JohnDoe          x       -       -
         * Peter Smith      x       x       -
         * Adam Ranger      -       -       x
         */
    
        const people = [
            {
                id: 0,
                title: "John Doe",
                trades: {
                    0: true,
                    1: false,
                    2: false,
                }
            },
            {
                id: 1,
                title: "Peter Smith",
                trades: {
                    0: true,
                    1: true,
                    2: false,
                }
            },
            {
                id: 2,
                title: "Adam Ranger",
                trades: {
                    0: false,
                    1: false,
                    2: true,
                }
            }
        ];
        
        const trades = [
            {
                id: 0,
                title: "Foreman"
            },
            {
                id: 1,
                title: "Admin"
            },
            {
                id: 2,
                title: "Line Manager"
            }
        ];

        const result = [{id: -1, title: "matrix", type:"header"}];
        trades.forEach(item => result.push({id: item.id, title: item.title, type: "header"}));
    
        people.forEach(item => {
            result.push({id: item.id, title: item.title, type:"person"});
            result.push({person: item.id, trade: 0, value: item.trades["0"], type:"cell"});
            result.push({person: item.id, trade: 1, value: item.trades["1"], type:"cell"});
            result.push({person: item.id, trade: 2, value: item.trades["2"], type:"cell"});
        });

        return result;
    }
}