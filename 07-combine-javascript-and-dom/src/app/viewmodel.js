import { Person } from "./person.js";

export class ViewModel {

    constructor() {
        this.clickHandler = this._click.bind(this);
        this.keyHandler = this._key.bind(this);
        this._inputs = document.querySelectorAll('input');   
        this._actionButtons = document.querySelectorAll('button');   
        this._status = document.querySelector('div#status');    
        this._addEventListeners();     
    }

    dispose() {
        for (const element of this._inputs) {
            element.removeEventListener("keyup", this.keyHandler);
        }
        for (const element of this.actionButtons) {
            element.removeEventListener("click", this.clickHandler);
        }
        this._inputs = null;
        this._actionButtons = null;
        this.clickHandler = null;
        this.keyHandler = null;
        this.person = null;
        this._status = null;
    }

    /**
     * Adding eventlisteners for various inputs
     */
    _addEventListeners() {
        for (const input of this._inputs) {
            input.addEventListener("keyup", this.keyHandler);
        }

        for (const button of this._actionButtons) {
            button.addEventListener("click", this.clickHandler);
        }
    }

    /**
     * Handles the click events and calls respective methods
     * @param {*} event 
     */
    _click(event) {
        this[`${event.currentTarget.id}`]();
        // console.log('change to target');
        
    }

    /**
     * Handles the keyup events
     */
    _key() {
        const isValid = this._inputValidation(this._inputs); 

        if (isValid) {
            this._disableActionButton("create", false);
        } else { 
            this._disableActionButton("create", true);
        }
    }

    /**
     * Uses information form input values and creates a new Person
     */
    create() {
        const inputValues = [];
        
        for (const element of this._inputs) {
            inputValues.push(element.value);
            element.setAttribute("disabled","");
        }
        this.person = new Person(...inputValues);    
        this._disableActionButton("create", true);
        this._disableActionButton("start", false);
        this._disableActionButton("stop", false);
    }
    
    //TODO: BK - start() / Stop() very similar, but stuck on how to refactor due to how _click() handles calls
    // I want to try something like this - this.person[`${this}`]()  - , but tried variations on this expresssion without success
    start() {
        this.person.walk(true);      
        this._status.innerText = `Status: ${this.person.isWalking}`;
        this._status.dataset.status = "start";        
    }
    
    stop() {
        this.person.walk(false);      
        this._status.innerText = `Status: ${this.person.isWalking}`;
        this._status.dataset.status = "stop";        
    }

    _disableActionButton(btnName, disabledStatus) {
        (disabledStatus == true) 
            ? this._getActionButton(btnName, this._actionButtons).setAttribute("disabled","") 
            : this._getActionButton(btnName, this._actionButtons).removeAttribute("disabled");
    }
    
    /**
     * Locates the specific action element in actionButtons with "name" as the attribute value
     * @param {string} name 
     * @param {array of elements} actionButtons 
     */
    _getActionButton(btnName, actionButtons) {
        let myElement;

        for (const element of actionButtons) {
            if (element.getAttribute("id") == btnName) {             
                myElement = element;
            }
        }
        return myElement;
    }

     /**
     * Checks if all fields have been populated
     * @param {string} inputs 
     */
    _inputValidation(inputs) {
        let isPopulated = true;

        for (const field of inputs) {
            if(field.value == '') {
                isPopulated = false;
                break;
            } else {
                isPopulated = true;
            }
        }
        return isPopulated;
    }
}
