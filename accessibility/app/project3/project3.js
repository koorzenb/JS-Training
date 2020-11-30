import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/04.project3.md

    load() {
        crsbinding.data.updateUI(this._dataId, "main");
        crsbinding.data.updateUI(this._dataId, "tier1");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("main", this.getRenderData().mainArray);
        setPropertyCallback("tier1", this.getRenderData().tier1Array);
        console.log(this.getRenderData().mainArray);
        console.log(this.getRenderData().tier1Array);
    }

    getRenderData() {
        const main = [
            {
                text: "Section1"
            },
            {
                text: "Section2"
            },
            {
                text: "Section3"
            }
        ]

        const tier1 = [
            {
                text: "Child1"
            },
            {
                text: "Child2"
            },
            {
                text: "Child3"
            }
        ]
      
        // <ul>
        //             <template for.once="tier1Item of tier1">
        //                 <li for.once="tier1Item of tier1">${mainItem.label} {tier1Item.label}
                        
        //                 </li>
        //             </template>
        //         </ul>


        // <ul>
        //                     <li for.once="tier2Item of tier2">${mainItem.label} ${tier2Item.label}
        //                         <ul></ul>
        //                     </li>
        //                 </ul>

        const mainArray = [];
        const tier1Array = [];

        main.forEach(item => {
            mainArray.push({label: item.text})
        })

        tier1.forEach(item => {
            tier1Array.push({label: item.text})
        })
        
        return {mainArray, tier1Array};
    }

}