import { inputValidation, getActionButton } from "./helper.js";
import { Person } from "./person.js";

export class ViewModel {
    
    get requiredFields() {
        if (this._requiredFields == null) {
            this._requiredFields = document.querySelectorAll('input');
        }
        return this._requiredFields;
    }
    
    get actionButtons() {
        if (this._actionButtons == null) {
            this._actionButtons = Array.from(document.querySelectorAll('button'));
        }
        return this._actionButtons;
    }

    get statusElement() {
        if (this._status == null) {
            this._status = document.querySelector('div#status');
        }
        return this._status;
    }

    constructor() {
        this.clickHandler = this._click.bind(this);
        this.keyHandler = this._key.bind(this);
        this._addEventListeners();               
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
     * Handles the click events and calls respective methods
     * @param {*} event 
     */
    _click(event) {
        this[`${event.currentTarget.id}`]();
    }

    /**
     * Handles the keyup events
     */
    _key() {
        const isValid = inputValidation(this.requiredFields); 

        if (isValid) {
            this.disableActionButton("create", false);
        } else { 
            this.disableActionButton("create", true);
        }
    }

    /**
     * Uses information form input values and creates a new Person
     */
    create() {
        const inputValues = [];
        
        for (const element of this.requiredFields) {
            inputValues.push(element.value);
            element.setAttribute("disabled","");
        }
        this.person = new Person(...inputValues);    
        this.disableActionButton("create", true);
        this.disableActionButton("walk", false);
        this.disableActionButton("stop", false);
    }
    
    walk() {
        this.person.walk();      
        // this.person[`${this}`]()  - I want to try something like this, but various expresssions doesnt work
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.dataset.status = "walk";        
    }
    
    stop() {
        this.person.stop();      
        // this.person[`${this}`]()  - I want to try something like this, but various expresssions doesnt work
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.dataset.status = "stop";        
    }

    disableActionButton(btnName, disabledStatus) {
        disabledStatus ? getActionButton(btnName, this.actionButtons).setAttribute("disabled","") 
        : getActionButton(btnName, this.actionButtons).removeAttribute("disabled");
    }
}
