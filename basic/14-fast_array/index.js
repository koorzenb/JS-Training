export const processData = (data) => {
    if (data == null) data = getData();
    const processor = generateProcessor(data[0]);
    for (const item of data) {
        processor.process(item);
    }
    console.log(processor.result);
    return processor.result;
};

export const getData = () => {
    return [{value: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
};

const generateProcessor = (firstElement) => {
    //for firstElement
    // for each property 
    // create results.property
    // will assign results later to results[key] ~~ results.property
    // thus result.value.min = ...
    // maybe do results.value.type = number (???)

    const processor = {
        result: {
            min: null,
            max: null,
            avg: null,
            countAggregate: {},
            uniqueValues: []
        },
        process: (item) => {
            if (processor.result.min === null || item.value < processor.result.min) { // add numeric check
                processor.result.min = item.value;
            }

            if (processor.result.max === null || item.value > processor.result.max) {
                processor.result.max = item.value;
            }

            processor.result.avg = processor.result.avg === null ? item.value : (processor.result.avg + item.value) / 2;

            if (!processor.result.countAggregate[item.code]) {
                processor.result.countAggregate[item.code] = 0;
            }
            processor.result.countAggregate[item.code]++;
            if (processor.result.uniqueValues.indexOf(item.code) === -1) {
                processor.result.uniqueValues.push(item.code);
            }
        }
    };
    return processor;
};

// const processArray = (array) => {
//     let total, min, max, count;
//     const uniqueValues = [];
//     const keys = Object.keys(array[0]);
//     for (const key of keys) {
//         const arrayName = `unique${key}`;
//         eval(`${arrayName} = new Array();`); // test this
//     }
//     for (const arrayElement of array) {

//         for (const key of keys) {
//             const value = arrayElement[key];
//             if (typeof value === "number" || value instanceof Date) {
//                 if (value < arrayElement.min) {
//                     min = value;
//                 }
//                 if (value > arrayElement.max) {
//                     max = value;
//                 }
//                 total += value;
//             }
//         }
//         count++;


//         return {
//             min: array[0].min,
//             max: array[0].max,
//             avg: avg,
//             countAggregate: countAggregate,
//             uniqueValues: uniqueValues
//         };
//     };
// };

// /**
//  * Creates an array of unique values from an array of objects.
//  * @param {Array} array
//  * @returns {Object}
//  * @private
//  */
// _uniqueValues = (arrayElement, uniqueValues) => {
//     const keys = Object.keys(arrayElement);
//     for (const key of keys) {
//         const value = arrayElement[key];
//         uniqueValues.indexOf(value) === -1 && uniqueValues.push(value);
//     }
// };

// /**
//  * Get keyname - code
//  * create "uniqueCodes" - arrayName = `unique${keyName}`
//  *
//  */

module.exports = {processData, getData};