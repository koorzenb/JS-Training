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
        delete this._today
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
        const newEntry = this.calculateHours(this.formInput.value)
        this.saveToLocalStorage(newEntry);
        if (newEntry.difference != null) {
            clone.querySelector("#description").innerText = newEntry.difference;
            clone.querySelector("#date").innerText = formattedDate();
            const fragment = new DocumentFragment();
            fragment.appendChild(clone);
            this.itemsList.appendChild(fragment);
        }
    }

    calculateHours(newValue) {
// add to storage
        // check if same date
            // if so append and save
            // else start new and save

        // TODO: check if same date exists on local storage -> alert... and overwrite

        
        //get old
        // get new
        //subtract 
        let currentStorage = localStorage.getItem(this.entryDate)
        if(currentStorage != null) {
            currentStorage = JSON.parse(currentStorage);
        }


        const loggedTimes = {};
        if(currentStorage == null || currentStorage.end != null) {
            if (currentStorage?.end != null) localStorage.removeItem(this.entryDate);
            loggedTimes.start = parseInt(newValue);
            console.log("Starting time saved");
        } else if (currentStorage.start != null && currentStorage.end == null){
            loggedTimes.start = currentStorage.start;
            loggedTimes.end = parseInt(newValue);
            loggedTimes.difference = loggedTimes.end - loggedTimes.start;
            console.log("End time saved");
        }
        return loggedTimes;
    }

    saveToLocalStorage(newHours) {
        const currentStorage = localStorage.getItem(this.entryDate)
        if (currentStorage != null)
        alert(`Current value = ${currentStorage}`);

        localStorage.setItem(this.entryDate, JSON.stringify(newHours));
    }
}