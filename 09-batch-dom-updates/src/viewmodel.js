import { registerEvent, unregisterEvents } from "./utils.js";

get date() {
    if (this._date == null) {
        this._date = formattedDate();
    }
    return this._date;
}

get inputs() {
    if(this._input == null) {
        this._input = document.querySelector("input#input-details"),
        this._btnAdd = document.querySelector('button#add');
        this._btnClose = document.querySelector('button#close');
    }
    return {input: this._input, btnadd: this._btnAdd, btnClose: this_btnClose}
}

export class ViewModel {
    constructor() {
                /*
        never empty string check!
        adjacent to template
        trim() to flatten out ending whitespace
        svg to button  	
        move descrip to utils
        get focus on button
        must have aria next time
        check again around 54min + 1.07
        */
        this.init();
    }

    init() {
        this.btnAdd = document.querySelector('button#add');
        this.btnClose = document.querySelector('button#close');
        this.addHandler = this._add.bind(this);
        registerEvent(this.btnAdd,'click', this.addHandler); 
        this.template = document.querySelector('template');
    }

    dispose() {
        this.template = null;
        this._date = null;
        unregisterEvents();
        this._input = null;
        this._btnAdd = null;
        this.btnClose = null;
    }

    _add() {
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);
        itemDescription = this.getItemDescription();
        if(itemDescription.length != 0) {
            clone.querySelector("#description").innerText = itemDescription;
            clone.querySelector("#date").innerText = formattedDate();
            fragment.appendChild(clone);
            document.body.appendChild(fragment);
        }
    }

    getItemDescription() {
blah
    }

}