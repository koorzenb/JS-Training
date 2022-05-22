export default class Binding {

    constructor(element) {
        this.element = element;
    }

    dispose() {
        this.element = null;
    }


    _textParser(context) {
        let text;
        if (this.element instanceof HTMLElement === true) text = this.element.innerHTML;
        if (typeof this.element === "string") {
            text = this.element;
        } else {
            throw new Error("not implemented");
            return false;
        }
        const regex = /{{(.*?)}}/g;
        const matches = text.match(regex);
        if (matches) {
            for (const match of matches) {
                const property = match.replace("{{", "").replace("}}", "");
                const value = context[property];
                text = text.replace(match, value);
            }
        }
        return text;
    }


    /**
      * Set binding expressions
      * @private
      */
    setBindingExpressions() {
        const context = this._locateBindingExpressions();
        const html = this._textParser(this.div.innerHTML, this[`_${context}`]());
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

    /**
     * Find .bind expressions in the DOM and return the context
     * @param {*} element 
     * @returns 
     */
    _locateBindingExpressions(element) {
        const attributes = element.attributes;
        for (const attr of attributes) {
            if (attr.name.includes(".bind")) {
                return attr.name.replace(".bind", "").replace("data-", "");
            }
        }
    }
}