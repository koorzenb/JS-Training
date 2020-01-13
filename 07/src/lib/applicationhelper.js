/**
 * validateInputs receives an array of elements and check if all element in array has values
 * @param {Object} elements
 * @returns {boolean}
 */
export function validateInput(elements) {
    let count = 0;

    for (const element of elements) {
        if (element.value != null && element.value != "") {
            count++;
        }
    }
    return count === elements.length;
}

/**
 * getRequireElements extracts the values of an array of elements and returns new array of values
 * @param {Array} elements
 * @returns {Array} values
 */
export function getRequiredValues(elements) {
    const values = [];
    for (const el of elements) {
        values.push(el.value);
    }
    return values;
}

/**
 * findActionButtons compares an predefined action (myAction) and to an array of available actionButtons and returns the index of respective action button
 * @param {String} myAction
 * @param {Array} actionButtons
 * @returns {Int}
 */
export function findActionButton(myAction, actionButtons) {
    return actionButtons.find(element => {
        if (element.getAttribute("action") === myAction) {
            return element;
        }
    });
}
