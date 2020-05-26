export class ViewModel {

get template() {
    if (this._template == null) {
        this._template = document.querySelector('template');
    }
    return this._template;
}
    
    constructor() {
        this.body = document.querySelector('body');
        const addHandler = this._add.bind(this);
        const btnAdd = document.querySelector('button');
        btnAdd.addEventListener('click', addHandler);         
    }

    dispose() {
    }

    _add() {
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);
        const myBody = document.querySelector('body');
        fragment.appendChild(clone);
        this.body.appendChild(fragment);
    }
}