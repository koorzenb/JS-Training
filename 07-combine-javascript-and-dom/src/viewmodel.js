import { inputValidation } from "./helper.js";
import { Person } from "./person.js";

export class ViewModel {
    
    get requiredFields() {
        if (this._requiredFields == null) {
            this._requiredFields = document.querySelectorAll('[required]');
        }
        return this._requiredFields;
    }
    
    get actionButtons() {
        if (this._actionButtons == null) {
            this._actionButtons = Array.from(document.querySelectorAll('[action]'));
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

        for (const element of this.actionButtons) {
            element.addEventListener("click", this.clickHandler);
        }
    }

    _click(event) {
        if(event.currentTarget.getAttribute("action") == "create") {
            const values = []
            for (const element of this.requiredFields) {
                values.push(element.value);
            }
            console.log(values.join(","));
            
            const person = new Person(values.join(","));
            console.log(person.firstname);            
        }
        
        // if(event.currentTarget.value)
    }

    _key(event) {
        const isValid = inputValidation(this.requiredFields); 
        const btnCreate = this.actionButtons.find(element => {
            if (element.getAttribute("action") == "create") {
                return element;
            } else {
                return false;
            } 
        });

        if (isValid) {
            btnCreate.removeAttribute("disabled");
        } else { 
            btnCreate.setAttribute("disabled","")
        }
    }
}