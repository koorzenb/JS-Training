export function fetchFiles(files) {
    const fetchedFiles = [];
    
    for (const file of files) {
        fetchedFiles.push(fetch(file));
    }

    return Promise.all(fetchedFiles);
}

export async function convertToText(response) {
    const content = [];
    for (const file of response) {
        const resolve = await file.text();
        content.push(resolve);   
    }    
    return content;
}

function _fileValidation(response) {
    response => {
        if(!response.ok){
            alert(`File not found:\n ${response.url}`);
        } 
    }
}

// fetch(file) = Promise pending with resolve = response
// assigning to const b = undefined because resolve is handled by promise