import { fetchFiles } from "./helper.js";

export function writeFiles() {

    const fragment = new DocumentFragment();
    // Spec
        // 1. write all to template literal
        // 2. async functions

    // Method
    // 1. fetch files
    fetchFiles()
    .then( files => {
        
        for (const file of files) {
            _appendToFragment(files);            
        }
    })

    // 4. insert fragment to template literal
    // 5. append to HTML
    
    
    // 3. pass to function that adds to fragment
    function _appendToFragment(fileContent) {
// 2. extract/convert to text
        
        fragment.appendChild(file);
    }
}