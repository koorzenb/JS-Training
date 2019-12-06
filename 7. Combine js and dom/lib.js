
export function getInputValue(name,lastName,age){    
    const nVal = document.getElementById("name").value;
    const lnVal = document.getElementById("lastName").value;
    const aVal = document.getElementById("age").value;
    
    const details = nVal + lnVal + aVal;
    return details;
}

document.getElementById("try").addEventListener("click", function(){ 
    document.getElementById("text").innerText = "GeeksforGeeks"; 


class getTextFieldValue {
    get personDetails() {
        // if the element does not exist, fetch it and cache it
        if (this._personDetails == null) {
            this._personDetails = document.querySelector("my-element");
        }

        // return the cached item
        return this._personDetails;
    }

    set myElement(newValue) {
        // used to set the reference and also clean it by setting it to null in the dipsose
        this._myElement = newValue;
    }

    dispose() {
        // set the reference pointer to null so that garbage collection can happen
        myElement = null;
    }
}

