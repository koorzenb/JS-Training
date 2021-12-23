import { formattedDate, registerEvent, unregisterEvents } from "./utils/system-utils.js";
import { FileIO } from "./fileIO.js";

export class ViewModel {

    constructor() {
        this.init();
        console.log("viewModel started");
    }
    
    dispose() {
        unregisterEvents(addButton, "click")
        delete this.clickHandler;
        delete this.itemTemplate;
        delete this.formInput;
        delete this.itemsList;
    }
    
    /**
     * Initializes view model
     */
    init() {
        const addButton = document.querySelector("#addItem");
        this.itemsList = document.querySelector("ul");
        this.clickHandler = this._click.bind(this);
        this.formInput = document.querySelector("form input");
        registerEvent(addButton, "click", this.clickHandler);
        this.itemTemplate = document.querySelector("template#item");
        this.entries = []
    }

    /**
     * Handles click event
     * @param {*} event 
     */
    _click(event) {
        if (event.currentTarget.id == "addItem") this.addItem(event);
    }

    /**
     * Adds an item to the DOM
     * @param {*} event 
     */
    addItem(event) {
        event.preventDefault();
        const clone = this.itemTemplate.content.cloneNode(true);
        const description = this.formInput.value;
        clone.querySelector("#description").innerText = description;
        const date = formattedDate();
        clone.querySelector("#date").innerText = date;
        const fragment = new DocumentFragment();
        fragment.appendChild(clone);
        this.itemsList.appendChild(fragment);
        this.entries.push({date, description});
        this.formInput.value = "";
        this.fileIO = new FileIO();
        this.fileIO.saveToLocalStorage({data: this.entries});
        const load = this.fileIO.loadFromLocalStorage();
        this.fileIO = null;
    }
}