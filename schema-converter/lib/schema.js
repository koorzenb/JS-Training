const fetchSchema = async (filePath, fileLibrary) => {
    const result = await fileLibrary.readJson(filePath);
    return result.data;
}

const writeSchema = async (schema, path, fileLibrary) => {
    const schemaData = JSON.stringify(schema, null, 2);

    const result = await fileLibrary.writeJson(path, schemaData);
    result.error != null && console.error("Could not write schema back", result.error, schema.resource, schema.type);
}

const deepCompareSchemaItems = async (schemaItem1, schemaItem2, propertiesToDelete, objectLibrary) => {

    if (schemaItem1 == null && schemaItem2 == null) return true;
    if (schemaItem1 != null && schemaItem2 == null) return false;
    if (schemaItem1 == null && schemaItem2 != null) return false;

    const clone1 = await objectLibrary.clone(schemaItem1);
    const clone2 = await objectLibrary.clone(schemaItem2);

    await objectLibrary.deleteNestedProperty(clone1, propertiesToDelete);
    await objectLibrary.deleteNestedProperty(clone2, propertiesToDelete);

    return await objectLibrary.deepEqual(clone1, clone2);
}

const schemaLibrary = {
    fetchSchema,
    writeSchema,
    deepCompareSchemaItems
};

export {schemaLibrary};