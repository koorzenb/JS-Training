export class FileManager{
    
    fetchFiles(){
        this.file1 = fetch('./documents/1_p.md');
        this.file2 = fetch('./documents/2_p.md');
        this.file3 = fetch('./documents/3_p.md'); 

        return Promise.all([this.file1, this.file2, this.file3]);
    }

    dispose() {
        this.file1 = null;
        this.file2 = null;
        this.file3 = null;
    }
}