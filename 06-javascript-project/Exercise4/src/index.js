export async function main() {
    const response = await fetchFiles(["./documents/1_p.md", "./documents/2_p.md", "./documents/3_p.md"]);
    const content = await processFiles(response);    
    renderContent(content);
}

function fetchFiles(files) {
    const fetchedFiles = [];
    
    for (const file of files) {
        fetchedFiles.push(fetch(file));
    }
    return Promise.all(fetchedFiles)
}

async function processFiles(response) {
    const content = [];
    for (const file of response) {
        const resolve = await file.text();
        content.push(resolve);   
    }    
    return content;
}

function renderContent(content) {
    const p = document.createElement('p')
    p.innerText = `${content.join('\n')}`;
    document.querySelector('body').appendChild(p); 
}

