/**
 * Create a object structure from fields to determine what fields are present across all defs and what are not.
 * @param fieldDefs
 * @returns {{same: [], different: []}}
 */
export function createFieldCompStruct(fieldDefs) {
    const result = {
        same: [],
        different: []
    };

    for (let def of fieldDefs) {
        while (def.length > 0) {
            const field = def[0];
            const inAllDefs = isInAllDefs(field, fieldDefs);

            if  (inAllDefs == true) {
                result.same.push(field);
            }
            else {
                result.different.push(field);
            }
        }
    }

    return result;
}

/**
 * Create a data structure we can use to render, showing data items are the same or different to the master record.
 * The master record is the first data record in the data collection
 * @param fields {{same: [], different: []}}
 * @param data {Array}
 */
export function createDataCompStruct(fields, data) {
    // 1. create result structure
    const result = {
        same: new Map(),
        different: new Map()
    };

    // 2. process the same fields
    setComparisonData(fields.same, data, result.same);
    setComparisonData(fields.different, data, result.different);

    return result;
}

/**
 * populate comparison structure by processing the fields and compare them with the master record.
 * @param fieldsCollection
 * @param data
 * @param map
 */
function setComparisonData(fieldsCollection, data, map) {
    const master = data[0];

    for (let field of fieldsCollection) {
        const compCollection = [];
        for (let record of data) {
            compCollection.push({
                value: record[field],
                isSame: master[field] === record[field]
            })
        }

        map.set(field, compCollection);
    }
}

/**
 * Check the field and see if it is present in each array.
 * This can be optimised but keeping it simple for now.
 * @param field
 * @param fieldDefs
 * @returns {boolean}
 */
function isInAllDefs(field, fieldDefs) {
    // 1. Check in all the arrays if the value is present in all the arrays.
    let result = true;

    for (let def of fieldDefs) {
        const index = def.indexOf(field);

        if (index == -1) {
            result = false;
            continue;
        }
        else {
            def.splice(index, 1);
        }
    }

    return result;
}