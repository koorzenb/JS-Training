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

export function getActionButton(btnName, actionButtons) {
    let myElement;
    actionButtons.find(element => {
        if (element.getAttribute("id") == btnName) {             
            myElement = element;
        }  
    })
    return myElement;
}
