import { date } from "./utils.js";

export class ViewModel {

    get template() {
        if (this._template == null) {
            this._template = document.querySelector('template');
        }
        return this._template;
    }

    get date() {
        if (this._date == null) {
            this.date = date();
        }
        return this._date;
    }

    constructor() {
        this.addHandler = this._add.bind(this);
        this.btnAdd = document.querySelector('button');
        this.btnAdd.addEventListener('click', this.addHandler); 
    }

    dispose() {
        console.log('disposed');
        this.btnAdd.removeEventListener("click",this.addHandler);
        this.addHandler = null;
    }

    /**
     * Adds template to DOM
     */
    async _add() {
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);
        const answer = await this.ask();
        clone.querySelector("#description").innerText = answer;
        clone.querySelector("#date").innerText = date();
        fragment.appendChild(clone);
        document.body.appendChild(fragment);
    }      

    /**
     * Cleans up the popup once answers is submitted
     * @param {element} popup 
     */
    destroyPopup(popup) {
        popup.classList.remove('open');
        popup.remove();
        popup = null;
    }

    /**
     * Creates popup and asks user for details
     */
    ask() {
        const destroy = this.destroyPopup;
        
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

          // BK: is "{once : true}" a valid way of disposing eventlisteners?
          popup.addEventListener(
            'submit', (e) => 
            {
                e.preventDefault();
                resolve(e.target.input.value);
                // TODO BK: how to use "this" so that I do not have to assign destroy to variable (line 58)
                destroy(popup);
            },
            { once: true }
          );
      
          document.body.appendChild(popup);      
          popup.classList.add('open');
          window.focus();
        });
      }
}