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

    get statusElement() {
        if (this._status == null) {
            this._status = document.querySelector('[for="status"]');
        }
        return this._status;
    }

    constructor() {
        this.clickHandler = this._click.bind(this);
        this.keyHandler = this._key.bind(this);
        this._addEventListeners();    
        this.person;            
    }

    dispose() {
        for (const element of this.requiredFields) {
            element.removeEventListener("keyup", this.keyHandler);
        }
        for (const element of this.actionButtons) {
            element.removeEventListener("click", this.clickHandler);
        }
        this._requiredFields = null;
        this._actionButtons = null;
        this.clickHandler = null;
        this.keyHandler = null;
        this.person = null;
    }

    /**
     * Adding eventlisteners for various inputs
     */
    _addEventListeners() {
        for (const element of this.requiredFields) {
            element.addEventListener("keyup", this.keyHandler);
        }

        for (const element of this.actionButtons) {
            element.addEventListener("click", this.clickHandler);
        }
    }

    /**
     * Handles click event
     * @param {*} event 
     */
    _click(event) {
        const attribute = event.currentTarget.getAttribute("action");
        this[`_${attribute}Person`](event);     
    }

    /**
     * Handles keystroke events
     */
    _key() {
        const isValid = inputValidation(this.requiredFields); 
        
        isValid ? this._getActionButton("create").removeAttribute("disabled") : 
            this._getActionButton("create").setAttribute("disabled","");
    }

    /**
     * Performs actions when the "create person" button is clicked
     */
    _createPerson() {
        const inputValues = [];
        
        for (const element of this.requiredFields) {
            inputValues.push(element.value);
        }
        this.person = new Person(...inputValues);    
        this.statusElement.innerText = `Status: ${this.person.firstname} ${this.person.lastname} (${this.person.age}) created `;
        this._getActionButton("create").setAttribute("disabled","");
        // expertmenting with nextElementSibling
        this._getActionButton("create").nextElementSibling.removeAttribute("disabled");
        this._getActionButton("stop").removeAttribute("disabled");
        for (const element of this.requiredFields) {
            element.setAttribute("disabled","");
        }
    }
    
     /**
     * Performs actions when the "walk person" button is clicked
     */
    _walkPerson() {
        this.person.startWalking();
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.setAttribute("status","isWalking");
        this.statusElement.removeAttribute("isIdle");
    }
    
    /**
     * Performs actions when the "stop person" button is clicked
     */
    _stopPerson() {
        this.person.stopWalking();
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.setAttribute("status","isIdle");
        this.statusElement.removeAttribute("isWalking");
    }

    
    /**
     * Locates the specific action element in actionButtons with "name" as the attribute value
     * @param {string} name 
     * @param {array of elements} actionButtons 
     */
    _getActionButton(name) {
        let myElement;
        this.actionButtons.find(element => {
            if (element.getAttribute("action") == name) {             
                myElement = element;
            }  
        })
        return myElement;
    }
}