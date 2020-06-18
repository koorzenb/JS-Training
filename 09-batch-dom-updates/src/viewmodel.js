import { registerEvent, unregisterEvents } from "./utils.js";

export class ViewModel {
    constructor() {
                /*
        never empty string check!
        adjacent to template
        trim()/
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

    }

}