const fieldsMap = new Map();
fieldsMap.set("woFields",["code", "description", "lastAccessed", "field"]);
fieldsMap.set("regAssetFields",["code", "description", "lastModified", "field"]);
fieldsMap.set("taskFields",["code", "description", "lastAccessed", "Alarm"]);
const arrayOfFieldArrays = [];

function buildDataStruct(collection_ResourceFields){
    let groups = {
        same: [],
        different: []
    }

    for (const refArray of collection_ResourceFields) {
        
    }
}

function _isInAll(field,collection_ResourceFields) {
    result = true;

    for (const refArray of collection_ResourceFields) {
        const index = refArray.indexOf(field);

        if(index === -1){
            result = false;
            continue;
        } else {
            
        }
    }
    return result;
}