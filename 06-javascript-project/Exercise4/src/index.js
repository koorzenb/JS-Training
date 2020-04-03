import { fetchFiles } from "./helper.js";

export function writeFiles() {
    const fragment = new DocumentFragment();
    const p = document.createElement('p');

    p.innerText = `${_processFiles()}`;
    fragment.appendChild(p);
    document.querySelector('body').appendChild(fragment);    
}

function _processFiles(){
    const textString = ["Content:"];

    fetchFiles()
    .then( files => {
        for (const file of files) {
            file.text().then(resolve => {
                textString.push(resolve);  
            })
        }
    })
    .catch(error => console.log(`Error loading files: ${error}`));
    
    console.log(textString);
    return textString;
}
