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

