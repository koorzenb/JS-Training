import { formattedDate, registerEvent, unregisterEvents } from "./utils.js";

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
    
    init() {
        const addButton = document.querySelector("#addItem");
        this.itemsList = document.querySelector("ul");
        this.clickHandler = this._click.bind(this);
        this.formInput = document.querySelector("form input");
        registerEvent(addButton, "click", this.clickHandler);
        this.itemTemplate = document.querySelector("template#item")
    }

    _click(event) {
        // this[`_${event}`];
        if (event.currentTarget.id == "addItem") this.addItem(event);
    }

    addItem(event) {
        event.preventDefault();
        const clone = this.itemTemplate.content.cloneNode(true);
        clone.querySelector("#description").innerText = this.formInput.value;
        clone.querySelector("#date").innerText = formattedDate();
        const fragment = new DocumentFragment();
        fragment.appendChild(clone);
        this.itemsList.appendChild(fragment);
    }
}