import { formattedDate, registerEvent, unregisterEvents } from "./utils/system-utils.js";

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
        this.itemTemplate = document.querySelector("template#item")
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
        clone.querySelector("#description").innerText = this.formInput.value;
        clone.querySelector("#date").innerText = formattedDate();
        const fragment = new DocumentFragment();
        fragment.appendChild(clone);
        this.itemsList.appendChild(fragment);
        this.formInput.value = "";
    }
}