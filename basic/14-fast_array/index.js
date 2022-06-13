export const processData = (data, amount = 1000000) => {
    if (data == null) data = getData(amount);
    const processor = generateProcessor(data[0]);
    for (const item of data) {
        processor.process(item);
    }
    console.log(processor.result);
    return processor.result;
};

/**
 * Generates data to be processed
 * @param amountOfRandomNumbers {number} - amount of random values to generate
 * @returns {[{code: string, value: number},{code: string, value: number},{code: string, value: number},{code: string, value: number}]}
 */
export const getData = (amountOfRandomNumbers = 100) => {
    // return [{value: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const data = [];
    let count = 1;

    do {
        const value = random(1, 26);
        const code = alphabet[random(0, 25)];
        data.push({value, code});
        count++;
    } while (count < amountOfRandomNumbers);

    return data;
};

export const generateProcessor = (firstElement) => {
    //for firstElement
    // for each property 
    // create results.property
    const result = {};
    const keys = Object.keys(firstElement);
    for (const key of keys) {
        result[key] = {};

        if (key === "value") {
            result[key].type = "number";
            result[key].min = null;
            result[key].max = null;
            result[key].avg = null;
        }

        if (key === "code") {
            result[key].type = "string";
            result[key].aggregate = {};
            result[key].uniqueValues = [];
        }
    }
    // will assign results later to results[key] ~~ results.property
    // thus result.value.min = ...
    // maybe do results.value.type = number (???)

    const processor = {
        process: (item) => {
            if (processor.result.value.min === null || item.value < processor.result.value.min) { // add numeric check
                processor.result.value.min = item.value;
            }

                if (processor.result.value.max === null || item.value > processor.result.max) {
                    processor.result.value.max = item.value;
                }

                processor.result.value.avg = processor.result.value.avg === null ? item.value : (processor.result.value.avg + item.value) / 2;

                if (processor.result.code.aggregate[item.code] == null) {
                    processor.result.code.aggregate[item.code] = 1;
                } else {
                    processor.result.code.aggregate[item.code];
                }

                if (processor.result.code.uniqueValues.indexOf(item.code) === -1) {
                    processor.result.code.uniqueValues.push(item.code);
                }
        },
        result
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

// module.exports = {processData, getData, generateProcessor};

processData();