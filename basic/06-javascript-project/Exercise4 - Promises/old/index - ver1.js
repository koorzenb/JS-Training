import { FileManager } from "./file-manager.js";
export class WriteFiles{

    constructor(){      
        this.fragment = new DocumentFragment();
        this.writeToScreen();
    }

    dispose() {
        this.fragment = null;
    }

    writeToScreen() {
        const fm = new FileManager();

        fm.fetchFiles()
        .then(files => {
            for (const file of files) {
                file.text().then(resolveToText => {
                    this._addToFragment(resolveToText);
                });
            }

            // this.p = document.createElement('p');
            // this.p.innerText = 'Hello';
            // document.querySelector('div').appendChild(this.p);
            console.log(this.fragment);
            document.querySelector('div').appendChild(this.fragment);
        })
        .catch(error => console.log('Error loading files: ', error));
        
        document.querySelector('body').appendChild(this.fragment);
    }

    _addToFragment(fileContent) {
          const section = document.createElement('section');
          section.innerHTML = fileContent;
          this.fragment.appendChild(section); 
    }
}