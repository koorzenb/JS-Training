import { registerEvent, unregisterEvents, formattedDate } from "./utils.js";

export class ViewModel {

    get date() {
        if (this._date == null) {
            this._date = formattedDate();
        }
        return this._date;
    }

    constructor() {
        this.init();
    }

    /**
     * Initializes module
     */
    init() {
        this.btnAdd = document.querySelector('button#add');     
        this.btnClose = document.querySelector('button#close');     // decided not to write iterator for only 2 buttons
        this.input = document.querySelector('input#input-details');
        this.form = document.querySelector('form#add');
        this.openHandler = this._open.bind(this);
        this.submitHandler = this._submit.bind(this);
        this.closeHandler = this._close.bind(this);
        registerEvent(this.btnAdd,'click', this.openHandler); 
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
    _open() {
        this.btnAdd.innerHTML = "&#x2713";
        registerEvent(this.btnClose,'click', this.closeHandler);
        
        this.btnClose.removeAttribute("hide");
        this.btnClose.removeAttribute("disabled");

        this.input.removeAttribute("hide");
        this.input.removeAttribute("disabled");
        this.input.focus();

        registerEvent(this.form, "submit", this.submitHandler);
    }

    /**
     * Closes input dialog box and disposes listeners
     */
    _close() {
        this.input.setAttribute("hide","");
        this.input.setAttribute("disabled","");
        this.input.value = null;

        this.btnAdd.innerHTML = "+";

        this.btnClose.setAttribute("hide","");
        this.btnClose.setAttribute("disabled","");
        unregisterEvents(this.btnClose,"click");
        
        unregisterEvents(this.form, "submit");
    }

    /**
     * Collects information, populate template and send to DOM
     */
    _submit(e) {
        e.preventDefault();
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);

        if(this.input.validity.valid && this.input.value.trim().length != 0) {
            clone.querySelector("#description").innerText = this.input.value;
            clone.querySelector("#date").innerText = formattedDate();
            fragment.appendChild(clone);
            document.body.appendChild(fragment);
            this._close();
        }
    }
}