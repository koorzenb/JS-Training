import { fetchFiles, convertToText } from "./helper.js";

export async function writeToScreen(files) {
    const response = await fetchFiles(files);    
    const content = await convertToText(response);    
    render(content);
}

function render(content) {
    const p = document.createElement('p')
    p.innerText = `${content.join('\n')}`;
    document.querySelector('body').appendChild(p); 
}

