export function fetchFiles(files) {
    const fetchedFiles = [];

    for (const file of files) {
        fetchedFiles.push(fetch(file));
    }
    return Promise.all(fetchedFiles)
}