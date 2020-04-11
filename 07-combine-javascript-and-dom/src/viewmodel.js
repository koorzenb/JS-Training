import { _inputValidation } from "./helper.js";

export class ViewModel {
    
    get requiredFields() {
        if (this._requiredFields == null) {
            this._requiredFields = document.querySelectorAll('[required]');
        }
        return this._requiredFields;
    }
    
    set requiredFields(newValue) {
        this._requiredFields = newValue;
    }

    constructor() {
        this.clickHandler = this._click.bind(this);
        this.keyHandler = this._key.bind(this);
        this._addEventListeners();                
    }

    dispose() {
        this.requiredFields = null;
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
        // console.log(event.currentTarget.value);
        
        if(_inputValidation(this.requiredFields)) {
          console.log('all populated');
            
        }
    }


}


// Make sure all required fields are populated
    // validate fields on keyup
            // EL on required
            // validation =
                // all fields have values
                    // foreach field in 'required', check:
                        // field != null || !undefined || !"" 
// Enable Create Person button
    // Set "change" (any other event type) event listener on rquired fields
// Create Person
    // Get values from required inputs
// Enabled Start/Stop
    // submit EL on Create
// Click Start/Stop walking
// Update Status
// Show person walking/idle
