import { fetchFiles } from "./helper.js";

export function writeFiles() {
    const listOfFiles = ["./documents/1_p.md", "./documents/2_p.md", "./documents/3_p.md"];
    const content = [];
    const p = document.createElement('p')

        fetchFiles(listOfFiles).then(files => {
            for (const file of files) {
                file.text()
                .then( resolve => content.push(resolve) )
                .then( () => {                    
                    p.innerText = `${content.join('\n')}`;
                    document.querySelector('body').appendChild(p);  
                })
            }
        });
}

