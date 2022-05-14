import {registerEvent, unregisterEvents} from "./utils/system-utils.js";
import Binding from "./binding.js";
export default class ViewModel {

    constructor() {
        this._init();
        const context = this.locateExpressions(this.div);
        const binding = new Binding;
        const html = binding.textParser(this.div.innerHTML, this[`_${context}`]());
        this.div.innerHTML = html;
        const attribute = binding.textParser(this.div.dataset[`${context}.bind`], this[`_${context}`]());
        this.div.dataset[`${context}.bind`] = attribute;
        console.log("viewModel started");

        // # You need a provider that deals with the ".bind" syntax on an attribute 
        // DO NOT SEARCH INITIALLY! ASSUME THAT YOU HAVE NAME AND GET MVP
        // - iterate thru attributes and find the one that has the ".bind" syntax. If it has the ".bind" syntax, then you need 
        //  - to use the provider to get the value of the attribute.
        // 
        /**
         * 1. Give element
         * 2. iterate thru element.attributes (element.atributes.filter(attr => attr.name.includes(".bind"))). Write to array
         * 3. For each element in array, get the context value (ie "name" in case of data-name.bind) of the attribute
         * 4. build a factory that call provider that will return the value of the context.
         * 5. replace the value of the attribute with the value of the context. (ie data-name="{{name}}"). 
         *    - parser: convert the value of the context to a string. Find instances of {{}} and replace with the value of the context.
         */


        // # and set's that attribute to the value in the context
        // find {{firstName}} 
        // fire "name" as context 
        // You also need a provider to deal with the inner text of a element and replace the "{{property}}" syntax with the actual value.

    }

    // not sure where else to store this data.
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