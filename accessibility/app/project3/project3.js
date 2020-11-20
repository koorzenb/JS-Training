import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/04.project3.md
// CSS: https://github.com/caperaven/training/blob/master/css/06.project2.md

    load() {
        crsbinding.data.updateUI(this._dataId, "main");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("main", this.getRenderData().mainArray);
        console.log(this.getRenderData().mainArray);
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

        const mainArray = [];

        main.forEach(item => {
            mainArray.push({label: item.text})
        })

        return {mainArray};
    }

}