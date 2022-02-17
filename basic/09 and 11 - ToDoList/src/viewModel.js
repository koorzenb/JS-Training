import {formattedDate, registerEvent, unregisterEvents, getHTML} from "./utils/system-utils.js";

export class ViewModel {

    constructor() {
        this.init();
        getHTML("list-item");
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(addButton, "click");
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
        this.itemsList = document.querySelector("#list-container");
        this.clickHandler = this.click.bind(this);
        this.keydownHandler = this.keydown.bind(this);
        this.formInput = document.querySelector("form input");
        registerEvent(addButton, "click", this.clickHandler);
        registerEvent(this.formInput, "keydown", this.keydownHandler);
        this.itemTemplate = document.querySelector("template#item");
        this.entries = [];
    }

    /**
     * Handles click event
     * @param {*} event 
     */
    click(event) {
        if (event.currentTarget.id == "addItem") {
            this.formInput.classList.remove("hidden");
        }
    }

    keydown(event) {
        if (event.key != "Enter") return;
        event.preventDefault();
        this.addItem();
    }

    /**
     * Adds an item to the DOM
     * @param {*} event 
     */
    addItem() {
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
        this.formInput.classList.add("hidden");
    }
}