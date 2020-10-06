import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/04.project3.md
// CSS: https://github.com/caperaven/training/blob/master/css/06.project2.md

    load() {
        crsbinding.data.updateUI(this._dataId, "nav");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("nav", this.getRenderData().navArray);
        console.log(this.getRenderData().navArray);
    }

    getRenderData() {
        const nav = [

        ]

        const navArray = [];

        nav.forEach(item => {
            navArray.push({title: item.title, link: item.link})
        })

        return {navArray};
    }

}