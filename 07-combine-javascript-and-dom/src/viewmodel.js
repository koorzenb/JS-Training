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
            this._status = document.querySelector('label#status');
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

    _addEventListeners() {
        for (const element of this.requiredFields) {
            element.addEventListener("keyup", this.keyHandler);
        }

        for (const element of this.actionButtons) {
            element.addEventListener("click", this.clickHandler);
        }
    }

    _click(event) {
        this[`${event.currentTarget.id}`]();
    }

    _key() {
        const isValid = inputValidation(this.requiredFields); 
        const btnCreate = getActionButton("create", this.actionButtons);

        if (isValid) {
            btnCreate.removeAttribute("disabled");
        } else { 
            btnCreate.setAttribute("disabled","")
        }
    }

    create() {
        const inputValues = [];
        
        for (const element of this.requiredFields) {
            inputValues.push(element.value);
        }
        this.person = new Person(...inputValues);    
        this.statusElement.innerText = `Status: ${this.person.firstname} ${this.person.lastname} (${this.person.age}) created `;
        getActionButton("create", this.actionButtons).setAttribute("disabled","");
        getActionButton("walk", this.actionButtons).removeAttribute("disabled");
        getActionButton("stop", this.actionButtons).removeAttribute("disabled");
        for (const element of this.requiredFields) {
            element.setAttribute("disabled","");
        }
    }
    
    walk() {
        this.person.walk();      
        // this.person[`${this}`]()  - I want to try something like this, but various syntaxes doesnt work
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.dataset.status = this;
    }
    
    stop() {
        this.person.stop();      
        // this.person[`${this}`]()  - I want to try something like this, but various syntaxes doesnt work
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.dataset.status = this;
    }
    
    /**
     * Locates the specific action element in actionButtons with "name" as the attribute value
     * @param {string} name 
     * @param {array of elements} actionButtons 
     */
    _getActionButton(name) {
        let myElement;
        this.actionButtons.find(element => {
            if (element.getAttribute("id") == name) {             
                myElement = element;
            }  
        })
        return myElement;
    }
}

/**

change to action-data-set
button.dataset.action.create

stop/walk smaller
 */
