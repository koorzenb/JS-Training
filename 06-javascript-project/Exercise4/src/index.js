import { fetchFiles } from "./helper.js";

problem was that I did not add to literal, was convoluted and that I did not add properly to DOM 
export function writeFiles() {
let p = "";

    fetchFiles().then((files) => {
        for (const file of files) {
            _addFilesToString(file.text());
            
            p.concat(`${file.text()}`);
        }  

    })

    function _addFilesToString(fileContent) {
        
    }
}


