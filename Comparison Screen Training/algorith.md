```js

# Version 5

/*
    get all field arrays
    
        fieldDefs = all arrays
        def = 1 array

    create struct to store results in:
        results = {
            same: []
            diff
        }
    }

    forof( const anArray in manyArrays )
        while anArray > 0
            field = anArray[0]
            inAllDefs = isInAllDefs(field,manyArrays)

isInAllDefs()
    result = true;

    for (const anArray of manyArrays)
        index = anArray.indexOf(field)

        if (field is not in array)
            result = false
            skip and continue with remainder of this for loop
        else
            remove field from array

*/

#Version 4
use Set()
// 1. combined all fields in 1 long array
// 2. Use set to determine unique fields (const = uniqueFields)
// 3. loop thru each array. If a unique field occurs in all arrays, then field = common

# Version 3
// 1. get master
    // getFields(masterId)

// 2. compare each field of master to other fields to evaluate similarity. Separate same fields/ unrelated fields
    // Compare
        // masterArray[0] === arrayOfArrays[0].secondaryArray[0 -> 10]
        // masterArray[0] === arrayOfArrays[1].secondaryArray[0 -> 10]
        // ...
        // masterArray[1] === arrayOfArrays[0].secondaryArray[0 -> 10]
 
    // If found in secondary:
        // remove from secondary so that next iteration thru secondary will not include this element.(Do NOT break from search - make sure no duplicates)
        // if isInDef already true, then        (if false, do not set as true since onther array did not contain)
            // set isInDef = true
    // If not found in secondary:
        // use master[0] to set isInDef = false
            // unrelated = master[0]

    // If isInDef = true afte iterating thru all arrays, then element was found everywhere and thus {same = element}
        // use master[0] to set isInDef = true
            // same = master[0]












### Version 2

//         // compare each element in masterArray to every element in other arrays
//         const otherArray = [...this.getFields("regAssetFields"),...this.getFields("taskFields")];

//         // foreach element in masterArray, loop thru otherArray
//         for (const mField of masterArray) {
//             for (const oField of otherArray) {
//                 // if  master[0] == otherArrays[x]
//                 if (mField === oField) {
//                     results.same.push(oField);
//                     // remove all instances of element in remainder of otherArray
//                     while(otherArray.indexOf(oField) != -1){
//                         otherArray.splice(otherArray.indexOf(oField),1)
//                     }
//                 }
//             }
//         }

//         // at the end of master array, after all elements in other arrays have been purged, the remainder in the other arrays are all unrelated
//             // loop thru remainder of otherArray/fields and add to "unrelated"
//         for (const field of otherArray) {
//             results.unrelated.push(field);
//         }

//         return results;
//     }
// }

```
