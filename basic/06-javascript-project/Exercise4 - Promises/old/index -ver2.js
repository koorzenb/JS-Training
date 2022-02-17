import { fetchFiles } from "./helper.js";

export function writeFiles() {

}

function _processFiles(){
    const textString = ["Content:"];
    
    fetchFiles()
    .then( files => {
        for (const file of files) {
            file.text().then(resolve => {
                textString.push(`${resolve}`);  
                console.log(resolve);
            })
        }
    })
    .then(() => {
        console.log(textString);

        const fragment = new DocumentFragment();
        const p = document.createElement('p');
    
        p.innerText = `${_processFiles()}`;
        console.log(p);
        fragment.appendChild(p);
        document.querySelector('body').appendChild(fragment);    
    })
    .catch(error => console.log(`Error loading files: ${error}`));
    
    // return textString;



}
