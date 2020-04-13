export function _inputValidation(inputs) {
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