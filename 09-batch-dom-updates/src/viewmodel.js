import { registerEvent, unregisterEvents, formattedDate } from "./utils.js";

export class ViewModel {

    get date() {
        if (this._date == null) {
            this._date = formattedDate();
        }
        return this._date;
    }

    constructor() {
        console.log('viewmodel working');
                /*
        move descrip to utils
        must have aria next time
        check again around 54min + 1.07
        */
        this.init();
    }

    /**
     * Initializes module
     */
    init() {
        this.btnAdd = document.querySelector('button#add');     
        this.btnClose = document.querySelector('button#close');     // decided not to write iterator for only 2 buttons
        this.input = document.querySelector('input#input-details');
        this.addHandler = this._add.bind(this);
        registerEvent(this.btnAdd,'click', this.addHandler); 
        this.template = document.querySelector('template');
    }

    dispose() {
        this.template = null;
        this._date = null;
        unregisterEvents();
        this.input = null;
        this.btnAdd = null;
        this.btnClose = null;
    }

    /**
     * Opens input dialog and sets new eventListeners
     */
    _add() {
        this.input.removeAttribute("hidden");

        this.submitHandler = this._submit.bind(this);
        this.btnAdd.addEventListener("click", this.submitHandler)
        this.btnAdd.removeEventListener("click", this.addHandler)
        this.btnAdd.innerHTML = "&#x2713";

        this.closeHandler = this._close.bind(this);
        this.btnClose.addEventListener('click', this.closeHandler);
        this.btnClose.removeAttribute("hidden");
    }

    /**
     * Closes input dialog box and disposes listeners
     */
    _close() {
        this.input.setAttribute("hidden","");
        this.input.value = null;

        this.btnAdd.innerHTML = "+";
        this.btnAdd.addEventListener("click", this.addHandler)
        this.btnAdd.removeEventListener("click", this.submitHandler)
        this.submitHandler = null;

        this.btnClose.setAttribute("hidden","");
        this.btnClose.removeEventListener('click', this.closeHandler);
        this.closeHandler = null;
    }

    /**
     * Collects information, populate template and send to DOM
     */
    _submit() {
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);

        if(this.input.value != null && this.input.value.trim().length != 0) {
            clone.querySelector("#description").innerText = this.input.value;
            clone.querySelector("#date").innerText = formattedDate();
            fragment.appendChild(clone);
            document.body.appendChild(fragment);
            this._close();
        }
    }
}