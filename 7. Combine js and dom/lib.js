
    //attempting to create dynamic tag 
    export function addNameLabel () { 
        const newDiv = document.createElement("label");         
        const newContent = document.createTextNode("Name:"); 
        
        newDiv.appendChild(newContent);  
    
        // add the newly created element and its content into the DOM 
        const currentDiv = document.getElementById("inputs"); 
        document.body.insertBefore(newDiv, currentDiv); 
    }

    export function testListener(){
        document.getElementById("createPerson").addEventListener("click", changeText);
        
        function changeText(){ 
            document.getElementById("status").value = "test";         
        }
    }

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