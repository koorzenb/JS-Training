/**
 * Ensures that all required input fields have been populated
 * @param {nodes} inputs 
 */
export function inputValidation(inputs) {
    let isPopulated = false;

    for (const field of inputs) {
        if(field.value !='') {
            isPopulated = true;
        } else {
            isPopulated = false;
            break;
        }
    }
    return isPopulated;
}

/**
 * Locates an element in an array with "name" as the attribute value
 * @param {string} name 
 * @param {array of elements} actionButtons 
 */
export function getActionButton(name, actionButtons) {
    let myElement;
    actionButtons.find(element => {
        if (element.getAttribute("action") == name) {             
            myElement = element;
        }  
    })
    return myElement;
}
