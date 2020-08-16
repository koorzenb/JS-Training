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

    getRenderData() {
        const articles = [
            {
                id: 0,
                position: "first",
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article"
            },
            {
                id: 1,
                position: "second",
                link: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML"
            },
            {
                id: 2,
                position: "third",
                link: "https://www.w3.org/TR/wai-aria-practices/#tabpanel"
            }
        ];

        const result = [];
         articles.forEach(item => {
            result.push({article: item.id, position: item.position, link: item.link});
         });

         return result;
    }

}