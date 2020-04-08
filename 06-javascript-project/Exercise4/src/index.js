import { fetchFiles } from "./helper.js";

// problem was that I did not add to literal, was convoluted and that I did not add properly to DOM 
export function writeFiles() {
    const listOfFiles = ["./documents/1_p.md", "./documents/2_p.md", "./documents/3_p.md"];
    const myString = [];
    const section = document.createElement('section');
    fetchFiles(listOfFiles).then(files => {
        for (const file of files) {
            file.text().then( resolve => {
    // console.log(resolve);
                myString.push(resolve);
            })
        }
    });
    const p = document.createElement('p')
    console.log(myString);
    
    p.innerText = myString.join('\n');
    console.log(p);
    
    document.querySelector('body').appendChild(p);    
}

function _addFilesToString(fileContent) {
    console.log(fileContent);
    const p = document.createElement('p')
    p.innerText = fileContent;
}
