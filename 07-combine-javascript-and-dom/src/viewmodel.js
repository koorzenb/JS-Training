import { _inputValidation } from "./helper.js";

export class ViewModel {
    
    get requiredFields() {
        if (this._requiredFields == null) {
            this._requiredFields = document.querySelectorAll('[action]');
        }
        return this._requiredFields;
    }
    
    get actionButtons() {
        if (this._actionButtons == null) {
            this._actionButtons = document.querySelectorAll('.action-button');
        }
        return this._actionButtons;
    }

    constructor() {
        this.clickHandler = this._click.bind(this);
        this.keyHandler = this._key.bind(this);
        this._addEventListeners();                
    }

    dispose() {
        this.requiredFields = null;
        this.actionButtons = null;
        this.clickHandler = null;
        this.keyHandler = null;
    }

    _addEventListeners() {
        for (const element of this.requiredFields) {
            element.addEventListener("keyup", this.keyHandler);
        }
    }

    _click() {

    }

    _key(event) {
        if(_inputValidation(this.requiredFields)) {
          actionBUtton where attrib = create
          
        }
    }
}