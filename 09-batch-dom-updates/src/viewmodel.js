export class ViewModel {

    get template() {
        if (this._template == null) {
            this._template = document.querySelector('template');
        }
        return this._template;
    }

    get date() {
        if (this._date == null) {
            this._date = new Date().toDateString();
        }
        return this._date;
    }

    constructor() {
        this.addHandler = this._add.bind(this);
        this.btnAdd = document.querySelector('button');
        this.btnAdd.addEventListener('click', this.addHandler); 
        this.buttons = document.querySelectorAll('[data-question]');        
        this.buttons.forEach(button => button.addEventListener('click', askQuestion));
    }

    dispose() {
        // TODO:  remove eventlisteners
    }

    async _add() {
        const body = document.querySelector('body');
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);
        const answer = await this.ask();
        clone.querySelector("#description").innerText = answer;
        clone.querySelector("#date").innerText = this.date;
        fragment.appendChild(clone);
        body.appendChild(fragment);
    }
      
    async destroyPopup(popup) {
        popup.classList.remove('open');
        () => {return new Promise(resolve => setTimeout(resolve, 1000))}
        popup.remove();
        popup = null;
    }

    ask() {
        const destroy = this.destroyPopup;
        return new Promise(async function(resolve) {
          const popup = document.createElement('form');
          popup.classList.add('popup');
          popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
              <label>Enter details:</label>
              <input type="text" name="input"/>
              <button type="submit">Submit</button>
            </fieldset>
          `
          );

          popup.addEventListener(
            'submit', (e) => 
            {
                e.preventDefault();
                resolve(e.target.input.value);
                destroy(popup);
            },
            { once: true }
          );
      
          document.body.appendChild(popup);      
          popup.classList.add('open');
        });
      }

    //   async askQuestion(e) {
    //     const button = e.currentTarget;
    //     const cancel = 'cancel' in button.dataset;
      
    //     const answer = await this.ask({
    //       title: button.dataset.question,
    //       cancel,
    //     });
    //     console.log(answer);
    //   }
}