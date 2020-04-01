export class MyClass {
    constructor() {
        this.fieldsMap = new Map();
        this.fieldsMap.set("woFields",["code", "description", "lastAccessed", "field"]);
        this.fieldsMap.set("regAssetFields",["code", "description", "lastModified", "field"]);
        this.fieldsMap.set("taskFields",["code", "description", "lastAccessed", "Alarm"]);
    }

    getFields(resource) {
        return this.fieldsMap.get(resource);
    }

    createFieldCompStruct(){
        const results = {
            same : [],
            unrelated: []
        }

        // find fields that are similar - "silimar" group doesn't care what resource it belongs to
        // get master array.
        const masterArray = this.getFields("woFields");

        // compare each element in masterArray to every element in other arrays
        const otherArray = [...this.getFields("regAssetFields"),...this.getFields("taskFields")];

        // foreach element in masterArray, loop thru otherArray
        for (const mField of masterArray) {
            for (const field of otherArray) {
                // if  master[0] == otherArrays[x]
                if (mField === field) {
                    results.same.push(field);                            
                    // remove all instances of element in remainder of otherArray
                    while(otherArray.indexOf(field) != -1){
                        otherArray.splice(otherArray.indexOf(field),1)
                    }                            
                }  
            }                    
        }
        
        // at the end of master array, after all elements in other arrays have been purged, the remainder in the other arrays are all unrelated
            // loop thru remainder of otherArray/fields and add to "unrelated"
        for (const field of otherArray) {
            results.unrelated.push(field);
        }
        
        return results;     
    }
}