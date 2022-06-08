const processArray = (array) => {
    let total, min, max, count;
    const uniqueValues = [];
    const keys = Object.keys(array[0]);
    for (const key of keys) {
        const arrayName = `unique${key}`;
        eval(`${arrayName} = new Array();`); // test this
    }
    for (const arrayElement of array) {

        for (const key of keys) {
            const value = arrayElement[key];
            if (typeof value === "number" || value instanceof Date) {
                if (value < arrayElement.min) {
                    min = value;
                }
                if (value > arrayElement.max) {
                    max = value;
                }
                total += value;
            }
        }
        count++;


        return {
            min: array[0].min,
            max: array[0].max,
            avg: avg,
            countAggregate: countAggregate,
            uniqueValues: uniqueValues
        };
    };
};

/**
 * Creates an array of unique values from an array of objects.
 * @param {Array} array
 * @returns {Object}
 * @private
 */
_uniqueValues = (arrayElement, uniqueValues) => {
    const keys = Object.keys(arrayElement);
    for (const key of keys) {
        const value = arrayElement[key];
        uniqueValues.indexOf(value) === -1 && uniqueValues.push(value);
    }
};

/**
 * Get keyname - code
 * create "uniqueCodes" - arrayName = `unique${keyName}`
 * 
 */

module.exports = processArray;