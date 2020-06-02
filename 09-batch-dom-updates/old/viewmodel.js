import { formattedDate } from "./utils.js";

export class ViewModel {

    get date() {
        if (this._date == null) {
            this._date = formattedDate();
        }
        return this._date;
    }

    constructor() {
        this.addHandler = this._add.bind(this);
        this.btnAdd = document.querySelector('button');
        this.btnAdd.addEventListener('click', this.addHandler); 
        this.template = document.querySelector('template');
    }

    dispose() {
        console.log('disposed');
        this.btnAdd.removeEventListener("click",this.addHandler);
        this.addHandler = null;
        this.template = null;
        this._date = null;
    }

    /**
     * Adds template to DOM
     */
    async _add() {
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);
        const itemDescription = await this.getItemDescription();
        if(itemDescription != "") {
            clone.querySelector("#description").innerText = itemDescription;
            clone.querySelector("#date").innerText = formattedDate();
            fragment.appendChild(clone);
            document.body.appendChild(fragment);
        }
    }      

    /**
     * Cleans up the popup once answers is submitted
     * @param {element} popup 
     */
    destroy(popup) {
        popup.remove();
        popup = null;
    }

    /**
     * Creates popup and asks user for details
     */
    getItemDescription() {
        const destroy = this.destroy;
        
        return new Promise(async function(resolve) {
          const popup = document.createElement('form');
          popup.classList.add('popup');
          popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
              <label>Description:</label>
              <input type="text" name="input"/>
              <button type="submit">Submit</button>
            </fieldset>
          `
          );

          popup.addEventListener(
            'submit', (e) => 
            {
                e.preventDefault();
                if(e.target.input.value == "") {
                    resolve("");
                }
                else {
                    resolve(e.target.input.value);
                }
                destroy(popup);
            },
            { once: true }
          );
      
          document.body.appendChild(popup);      
          popup.classList.add('open');
        });
      }
}