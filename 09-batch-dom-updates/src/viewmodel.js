import { registerEvent, unregisterEvents, formattedDate } from "./utils.js";

export class ViewModel {

    get date() {
        if (this._date == null) {
            this._date = formattedDate();
        }
        return this._date;
    }

    constructor() {
                /*
        check again around 54min + 1.07 (validity)
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
        this.addHandler = this._open.bind(this);
        this.submitHandler = this._submit.bind(this);
        this.closeHandler = this._close.bind(this);
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
    _open() {
        this.input.removeAttribute("hide");
        this.input.removeAttribute("disabled");

        unregisterEvents(this.btnAdd, "click")
        registerEvent(this.btnAdd,"click", this.submitHandler)
        this.btnAdd.innerHTML = "&#x2713";

        registerEvent(this.btnClose,'click', this.closeHandler);
        this.btnClose.removeAttribute("hide");
        this.btnClose.removeAttribute("disabled");
    }

    /**
     * Closes input dialog box and disposes listeners
     */
    _close() {
        this.input.setAttribute("hide","");
        this.input.setAttribute("disabled","");
        this.input.value = null;

        this.btnAdd.innerHTML = "+";
        unregisterEvents(this.btnAdd);
        registerEvent(this.btnAdd,"click", this.addHandler)

        this.btnClose.setAttribute("hide","");
        this.btnClose.setAttribute("disabled","");
        unregisterEvents(this.btnClose);
    }

    /**
     * Collects information, populate template and send to DOM
     */
    _submit(e) {
        e.preventDefault();
        const fragment = new DocumentFragment();
        const clone = this.template.content.cloneNode(true);

        if(this.input.value != null && this.input.value.trim().length != 0) {
            clone.querySelector("#description").innerText = this.input.value;
            clone.querySelector("#date").innerText = formattedDate();
            fragment.appendChild(clone);
            document.body.appendChild(fragment);
            this._close();
        }
        else{
            this.input.setAttribute("invalid","")
        }
    }
}