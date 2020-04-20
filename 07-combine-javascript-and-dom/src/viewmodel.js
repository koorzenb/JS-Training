import { inputValidation, getActionButton } from "./helper.js";
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
        this.requiredFields = null;
        this.actionButtons = null;
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
        if(event.currentTarget.innerText == "CREATE PERSON"){
            this._createPerson();
        }

        if(event.currentTarget.innerText == "WALK PERSON"){
            this._walkPerson();
        }
        
        if(event.currentTarget.innerText == "STOP PERSON"){
            this._stopPerson();
        }        
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

    _createPerson() {
        const inputValues = [];
        console.log(this.requiredFields);
        
        for (const element of this.requiredFields) {
            inputValues.push(element.value);
        }
        this.person = new Person(...inputValues);    
        this.statusElement.innerText = `Status: ${this.person.firstname} ${this.person.lastname} (${this.person.age}) created `;
        getActionButton("create", this.actionButtons).setAttribute("disabled","");
        getActionButton("walk", this.actionButtons).removeAttribute("disabled");
        getActionButton("stop", this.actionButtons).removeAttribute("disabled");
        for (const element of this.requiredFields) {
            element.setAttribute("disabled");
        }
    }
    
    _walkPerson() {
        this.person.startWalking();
        this.statusElement.innerText = `Status: ${this.person.isWalking}`;
        this.statusElement.setAttribute("status","isWalking");
        this.statusElement.removeAttribute("isIdle");
    }
    
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

/**
 * when to use "for" in HTML

label
input

change to action-data-set
button.dataset.action.create

qs input
qs buttons
qs input#status

remove dispose (.. or at least on page unload) 

stop/walk smaller
 */
