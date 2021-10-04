import { formattedDate, registerEvent, unregisterEvents } from "./utils/system-utils.js";

export class ViewModel {

    get entryDate() {
        const temp = formattedDate();
        // check for null
        // check for new date
        if(this._today == null) {
            this._today = temp;
        }

        return this._today !== temp ? temp : this._today;
    }

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
        delete this._today;
        delete this.id;
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
        const entry = this.calculateHours(this.formInput.value)
        this.saveToLocalStorage(entry);
        if (entry.loggedTimes.difference != null) {
            const item = document.getElementById(`${entry.id}`);
            this.itemsList.removeChild(item);
            clone.querySelector(".item-description").innerText = `From ${entry.loggedTimes.start} - ${entry.loggedTimes.end} = ${entry.loggedTimes.difference} hours`;
        } else {
            clone.querySelector(".item-description").innerText = `From ${entry.loggedTimes.start} until...`;
        }
        // if hours > 6 , subtract 1 hour for lunch
        clone.querySelector(".item-date").innerText = formattedDate();
        clone.querySelector("li").setAttribute("id", entry.id);
        const fragment = new DocumentFragment();
        fragment.appendChild(clone);
        this.itemsList.appendChild(fragment);
        this.formInput.value = "";
    }

    calculateHours(newValue) {
        let currentStorage = localStorage.getItem(this.entryDate)
        if(currentStorage != null) {
            currentStorage = JSON.parse(currentStorage);
        }

        const date = new Date();
        const id = `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}`
        let existingItem
        try {
            existingItem = this.itemsList.querySelector(`#${id}`);
        } catch (error) {     
        }

        if (existingItem) this.itemsList.removeChild(existingItem);

        const loggedTimes = {};
        if(currentStorage == null || currentStorage.end != null) {
            if (currentStorage?.end != null) {
                localStorage.removeItem(this.entryDate);
                currentStorage = {};
            }
            loggedTimes.start = parseInt(newValue);
            console.log("Starting time saved");
            // add date id to input. Delete by id
        } else if (currentStorage.loggedTimes.start != null && currentStorage.loggedTimes.end == null){
            loggedTimes.start = currentStorage.loggedTimes.start;
            loggedTimes.end = parseInt(newValue);
            loggedTimes.difference = loggedTimes.end - loggedTimes.start;
            console.log("End time saved");
        }
        const entry = {
            id,
            loggedTimes
        }
        return entry;
    }

    saveToLocalStorage(newHours) {
        // const currentStorage = localStorage.getItem(this.entryDate)

        localStorage.setItem(this.entryDate, JSON.stringify(newHours));
    }
}