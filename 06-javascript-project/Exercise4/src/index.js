export class WriteFiles{

    constructor(){   
        this.fragment = document.createDocumentFragment();
    }

    dispose() {
        this.file1 = null;
        this.file2 = null;
        this.file3 = null;
        this.fragment = null;
    }


    fetchFiles(){
        const file1 = fetch('./documents/1_p.md');
        const file2 = fetch('./documents/2_p.md');
        const file3 = fetch('./documents/3_p.md'); 

        Promise.all([file1, file2, file3])
        .then(files => {
            for (const file of files) {                                
                file.text().then(resolveToString => this._addToFragment(resolveToString));                
            }
        })
        .catch(error => console.log('Error loading files: ', error));  
        
        document.querySelector('body').appendChild(this.fragment);
        console.log(fragment)
    }

    _addToFragment(fileContent) {
        const section = document.createElement('section');
        section.textContent = fileContent;
        this.fragment.appendChild(section);   
    }
}