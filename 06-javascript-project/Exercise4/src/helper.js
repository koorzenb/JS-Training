export function fetchFiles() {
    return Promise.all([fetch("./documents/1_p.md"), fetch("./documents/2_p.md"), fetch("./documents/3_p.md")]);
}