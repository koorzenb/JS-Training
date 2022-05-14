import {registerEvent, unregisterEvents} from "./utils/system-utils.js";
import Binding from "./binding.js";
export default class ViewModel {

    constructor() {
        console.log("viewModel started");
        this._init();
        this._setBindingExpressions();
    }

    /**
     * Set binding expressions
     * @private
     */
    _setBindingExpressions() {
        const context = this.locateExpressions(this.div);
        const binding = new Binding;
        const html = binding.textParser(this.div.innerHTML, this[`_${context}`]());
        this.div.innerHTML = html;
        const attribute = binding.textParser(this.div.dataset[`${context}.bind`], this[`_${context}`]());
        this.div.dataset[`${context}.bind`] = attribute;
    }

    // not sure where else to store this data.
    /**
     * Name data
     * @returns {Object}
     * @private
     */
    _name() {
        return {
            firstName: "John",
            lastName: "Smith",
            age: 20
        };
    }


    locateExpressions(element) {
        const attributes = element.attributes;
        for (const attr of attributes) {
            if (attr.name.includes(".bind")) {
                return attr.name.replace(".bind", "").replace("data-", "");
            }
        }
    }

    dispose() {
        unregisterEvents(addButton, "click");
        delete this.clickHandler;
        delete this.element;
    }



    _init() {
        this.div = document.querySelector("div");
        console.log(this.div.attributes);
    }

}