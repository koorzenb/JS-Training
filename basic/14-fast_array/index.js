const processArray = (array) => {
    let total, min, max, avg, count;
    const keys = Object.keys(array[0]);
    for (const arrayElement of array) {

        for (const key of keys) {
            value = arrayElement[key];
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
    };

    const avg = total / array.length;
    const countAggregate = array.reduce((acc, curr) => {
        const key = curr.code;
        if (acc[key]) {
            acc[key]++;
        } else {
            acc[key] = 1;
        }
        return acc;
    }, {});
    const uniqueValues = array.reduce((acc, curr) => {
        if (acc.indexOf(curr.code) === -1) {
            acc.push(curr.code);
        }
        return acc;
    }, []);

    return {
        min: array[0].min,
        max: array[0].max,
        avg: avg,
        countAggregate: countAggregate,
        uniqueValues: uniqueValues
    };
};
return {min, max, avg, countAggregate, uniqueValues};

module.exports = arrays;