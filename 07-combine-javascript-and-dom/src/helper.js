/**
 * Checks if all fields have been populated
 * @param {string} inputs 
 */
export function inputValidation(inputs) {
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

/**
 * Locates the specific action element in actionButtons with "name" as the attribute value
 * @param {string} name 
 * @param {array of elements} actionButtons 
 */
export function getActionButton(btnName, actionButtons) {
    let myElement;
    actionButtons.find(element => {
        if (element.getAttribute("id") == btnName) {             
            myElement = element;
        }  
    })
    return myElement;
}
