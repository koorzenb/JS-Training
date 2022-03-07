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
        this.addItem("this is the first", "21 Feb");
        this.addItem("this is the second", "29 Feb");
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
     * @param description {string}
     * @param date {string}
     * @param {*} event 
     */
    addItem(description, date) {
        const listItem = document.createElement("list-item");
        listItem.description = description;
        listItem.date = date;
        this.itemsList.appendChild(listItem);
    }
}