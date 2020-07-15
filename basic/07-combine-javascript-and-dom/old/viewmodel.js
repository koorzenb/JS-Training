export class ViewModel {
    get requiredValues() {
        if (this._requiredValues === null) {
            this._requiredValues = document.querySelector('');
        }
        return this._requiredValues;
    }

    set requiredValues(newValue) {
        this._requiredValues = newValue;
    }

    constructor() {}

    _click() {}

    _addEventListeners() {}

    dispose() {
        this.requiredValues = null;
    }
}
