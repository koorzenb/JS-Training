const clone = async (obj) => {
    if (obj == null) return null;
    return JSON.parse(JSON.stringify(obj));
}

const deepEqual = async (obj1, obj2) => {
    return JSON.stringify(obj1) == JSON.stringify(obj2);
}

const flattenStructure = async (obj, result) => {
    result == null && (result = {});
    for (const key in obj) {
        if ((obj[key] instanceof Array || obj[key] instanceof Object) === false) {
            //duplicate keys per file not that bad
            //result[key] != null && console.log(`Key already exists ${key} existing value ${result[key]} new value ${obj[key]}`);
            result[key] = obj[key];
        } else {
            await flattenStructure(obj[key], result);
        }
    }
    return result;
}

const setNestedProperty = async (obj, path, value) => {
    typeof (path) == "string" && (path = path.split("."));

    const pathKey = path[0];
    path = path.splice(1);

    if (path.length != 0) {
        obj[pathKey] == null && (obj[pathKey] = {});
        await setNestedProperty(obj[pathKey], path, value);
    } else {
        obj[pathKey] = value;
    }
}

const getNestedProperties = async (obj, searchText, result = []) => {
    for (const key in obj) {
        if ((obj[key] instanceof Array || obj[key] instanceof Object) === false) {
            (obj[key] || "").toString().includes(searchText) && result.push(obj[key]);
        } else {
            await getNestedProperties(obj[key], searchText, result);
        }
    }
    return result;
}

const deleteNestedProperty = async (obj, properties) => {
    for (const key in obj) {
        if (properties.includes(key)) {
            delete obj[key];
        } else {
            if (obj[key] instanceof Array || obj[key] instanceof Object) {
                await deleteNestedProperty(obj[key], properties);
            }
        }
    }
}

const updateNestedProperty = async (obj, property, value) => {
    for (const key in obj) {
        if (key == property) {
            obj[key] = value;
        } else {
            if (obj[key] instanceof Array || obj[key] instanceof Object) {
                await updateNestedProperty(obj[key], property, value);
            }
        }
    }
}

const getNestedObjectByProperty = async (obj, searchText, result = [], parentObject = {}) => {
    for (const key in obj) {
        if ((obj[key] instanceof Array || obj[key] instanceof Object) === false) {
            (obj[key] || "").toString().includes(searchText) && result.push({object: obj, parent: parentObject});
        } else {
            await getNestedObjectByProperty(obj[key], searchText, result, obj);
        }
    }
    return result;
}

const objectLibrary = {
    clone,
    deepEqual,
    flattenStructure,
    setNestedProperty,
    getNestedProperties,
    deleteNestedProperty,
    updateNestedProperty,
    getNestedObjectByProperty
}

export {objectLibrary};