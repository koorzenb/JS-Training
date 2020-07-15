/**
 * This function returns the sum of an array of numbers
 * @param {array} 
 * @returns {int} 
 */
export function addNumbers(...array) {
    return array.reduce((accum, current) => accum + current);
}


