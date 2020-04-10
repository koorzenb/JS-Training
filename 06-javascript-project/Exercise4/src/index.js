import { fetchFiles } from "./helper.js";

export async function writeFiles() {
    const listOfFiles = ["./documents/1_p.md", "./documents/2_p.md", "./documents/3_p.md"];
    const content = [];
    const p = document.createElement('p')

    const response = await fetchFiles(listOfFiles);
    
    for (const file of response) {
        const resolve = await file.text();
        content.push(resolve);            
        p.innerText = `${content.join('\n')}`;
        document.querySelector('body').appendChild(p);  
    }
}

