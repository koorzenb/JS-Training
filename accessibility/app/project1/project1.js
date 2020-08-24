import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

// Expressions: https://github.com/caperaven/crs-binding-documentation/blob/master/3.%20binding-expressions.md
// Project: https://github.com/caperaven/training/blob/master/accessibility/02.project1.md

export default class Project1 extends ViewBase {

    load() {
        crsbinding.data.updateUI(this._dataId, "items");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", this.getRenderData());
        console.log(this.getRenderData());
    }

    keydown(event) {
        console.log(event);
        // TODO: figure out how to navigate using keyboard. Target ids
        // get event
        // based on event, call key direction function
        
        // function keyDir(event){
            // id.focus();
        // }
        const item2 = document.querySelector('[data-id="2"]');
        item2.focus();
    }

    getRenderData() {
        const articles = [
            {
                id: 0,
                ariaLabelledby: 0,
                position: "first",
                link: "https://github.com/caperaven/training/blob/master/accessibility/02.project1.md"
            },
            {
                id: 1,
                ariaLabelledby: 1,
                position: "second",
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article"
            },
            {
                id: 2,
                ariaLabelledby: 2,
                position: "third",
                link: "https://www.w3.org/TR/wai-aria-practices/#feed"
            }
        ];

        const result = [];
         articles.forEach(item => {
            result.push({id: item.id, ariaLabelledby: item.ariaLabelledby, position: item.position, link: item.link});
         });

         return result;
    }

}