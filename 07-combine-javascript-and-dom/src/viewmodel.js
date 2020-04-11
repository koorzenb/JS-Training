export class ViewModel {
    
    get requiredFields() {
        if (this._requiredFields == null) {
            this._requiredFields = document.querySelector(['requiredFields']');
        }
        return this._requiredFields;
    }
    
    set requiredFields(newValue) {
        this._requiredFields = newValue;
    }
    constructor() {

    }


}


// Make sure all required fields are populated
    // validate fields on keyup
            // EL on required
            // validation = field != null || undefined 
// Enable Create Person button
    // Set "change" (any other event type) event listener on rquired fields
// Create Person
    // Get values from required inputs
// Enabled Start/Stop
    // submit EL on Create
// Click Start/Stop walking
// Update Status
// Show person walking/idle
