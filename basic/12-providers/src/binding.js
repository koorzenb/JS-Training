export default class Binding {

    set data(newValue) {
        this._data = newValue;
    }

    get data() {
        return this._data;
    }

    constructor(element, context) {
        this.data = {
            firstName: "John",
            lastName: "Smith",
            age: 20
        };
        this.element = element;
        this.context = context;
    }

    dispose() {
        this.element = null;
        this.context = null;
    }

    textParser(element, context) {
        let text = element;
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

}