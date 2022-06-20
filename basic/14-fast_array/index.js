export const processData = (data, amount = 1000000) => {
    if (data == null) data = getData(amount);
    const processor = generateProcessor(data[0]);
    for (const item of data) {
        processor.process(item);
    }
    return processor.result;
};

/**
 * Generates data to be processed
 * @param amountOfRandomNumbers {number} - amount of random values to generate
 * @returns {[{code: string, value: number},{code: string, value: number},{code: string, value: number},{code: string, value: number}]}
 */
export const getData = (amountOfRandomNumbers = 1000000) => {
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
        result[key].uniqueValues = [];

        if (typeof firstElement[key] === "number") {
            result[key].type = "number";
            result[key].min = null;
            result[key].max = null;
            result[key].avg = null;
        }

        if (typeof firstElement[key] === "string") {
            result[key].type = "string";
            result[key].aggregate = {};
        }
    }
    // will assign results later to results[key] ~~ results.property
    // thus result.value.min = ...
    // maybe do results.value.type = number (???)

    const processor = {
        process: (item) => {
            const keys = Object.keys(item)
            for (const propertyName of keys) {
                if (result[propertyName].type === "number") {
                    if (processor.result[propertyName].min === null || item[propertyName] < processor.result[propertyName].min) {
                        processor.result[propertyName].min = item[propertyName];
                    }

                    if (processor.result[propertyName].max === null || item[propertyName] > processor.result[propertyName].max) {
                        processor.result[propertyName].max = item[propertyName];
                    }

                    processor.result[propertyName].avg = processor.result[propertyName].avg === null ? item[propertyName] : (processor.result[propertyName].avg + item[propertyName]) / 2;
                }

                if (result[propertyName].type === "string") {
                    if (processor.result[propertyName].aggregate[item[propertyName]] == null) {
                        processor.result[propertyName].aggregate[item[propertyName]] = 1;
                    } else {
                        processor.result[propertyName].aggregate[item[propertyName]]++;
                    }

                    if (processor.result[propertyName].uniqueValues.indexOf(item[propertyName]) === -1) {
                        processor.result[propertyName].uniqueValues.push(item[propertyName]);
                    }
                }

                if (processor.result[propertyName].uniqueValues.indexOf(item[propertyName]) === -1) {
                    processor.result[propertyName].uniqueValues.push(item[propertyName]);
                }
            }
        },
        result
    };
    return processor;
};