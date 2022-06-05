export default class Binding {

    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }

    get context() {
        if (this._context == null) {
            this.context = "something";
        };
        return this._context;
    }

    set context(value) {
        const attributes = this.element.attributes;
        for (const attr of attributes) {
            if (attr.name.includes(".bind")) {
                this._context = attr.name.replace(".bind", "").replace("data-", "");
            }
        }
    }

    constructor(element) {
        this.element = element;
    }

    dispose() {
        this.element = null;
        this.context = null;
    }


    /**
     * Parses given object and replace bracket notation with values from context
     * @param {object} context 
     * @returns 
     */
    _textParser(element, context) {
        let text;
        if (element instanceof HTMLElement === true) {
            text = element.innerHTML;
        } else if (typeof element === "string") {
            text = element;
        } else {
            throw new Error("no implementation for type of element");
        }
        const regex = /{{(.*?)}}/g;
        const matches = text.match(regex);
        if (matches) {
            text = this._replaceBracketNotation(matches, context, text);
        }
        return text;
    }

    /**
     * Find instances of bracket notation and replace inner value with equivalent context value
     * @param {object} matches - array of regex matches
     * @param {object} context - object with data
     * @param {string} text - string representation of element
     * @private
     * @returns 
     */
    _replaceBracketNotation(matches, context, text) {
        for (const match of matches) {
            const property = match.replace("{{", "").replace("}}", "");
            const value = context[property];
            text = text.replace(match, value);
        }
        return text;
    }

    /**
      * Set binding expressions
      */
    updateUI() {
        this._setHTML(this.context);
        this._setAttributes(this.context);
    }

    /**
     * Changes attributes of element
     * @param {object} context - reference data to use
     */
    _setAttributes(context) {
        const attributeValue = this.element.dataset[`${context}.bind`];
        const attribute = this._textParser(attributeValue, this[`_${context}`]());
        this.element.dataset[`${context}.bind`] = attribute;
    }

    /**
     * Changes innerHTML of element
     * @param {object} context - reference data used  
     */
    _setHTML(context) {
        const html = this._textParser(this.element, this[`_${context}`]());
        this.element.innerHTML = html;
    }

    // not sure where else to store this data.
    /**
     * Name data - context object
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
}