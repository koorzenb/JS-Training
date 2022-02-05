import {formattedDate, registerEvent, unregisterEvents} from "./utils/system-utils.js";
import {FileIO} from "./fileIO.js";

export class ViewModel {

    get entryDate() {
        const temp = formattedDate();
        // check for null
        // check for new date
        if (this._today == null) {
            this._today = temp;
        }

        return this._today !== temp ? temp : this._today;
    }

    get localStorage() {
        if (this._currentStorage == null) {
            this._currentStorage = localStorage.getItem(this.entryDate);
            this._currentStorage = JSON.parse(this._currentStorage);
        }
        return this._currentStorage == null ? {} : this._currentStorage;
    }

    set localStorage(newValue) {
        // save by date
        // {
        //     lastsaved: "03102021",
        //     entries: [
        //         {
        //             weekNumber: 50,
        //             loggedTimes: [
        //                 [
        //                     {day: ...},
        //                     {day: ...}
        //                 ]
        //             ]
        //         }
        //     ]
        // }
        this._currentStorage = newValue;
        localStorage.setItem(this.entryDate, JSON.stringify(newValue));
    }

    constructor() {
        this.init();
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(addButton, "click");
        delete this.clickHandler;
        delete this.itemTemplate;
        delete this.formInput;
        delete this.itemsList;
        delete this._today;
        delete this.id;
        delete this.localStorage;
        delete this.fragment;
        delete this.dt;
    }

    /**
     * Initializes view model
     */
    init() {
        this.dt = new DateTime({});
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
        this.fileIO = new FileIO();
        this.fileIO.saveToLocalStorage({data: this.entries});
        const load = this.fileIO.loadFromLocalStorage();
        this.fileIO = null;
        this.formInput.classList.add("hidden");
    }

    calculateHours(newValue) {
        let loggedTimes = this.localStorage.loggedTimes ?? {};

        if (loggedTimes?.end != null || loggedTimes?.start == null || loggedTimes == null) {
            loggedTimes = {};
            loggedTimes.start = parseInt(newValue);
        } else if (loggedTimes?.start != null) {
            loggedTimes.end = parseInt(newValue);
            loggedTimes.difference = loggedTimes.end - loggedTimes.start;
            console.log("End time saved");
        }

        return loggedTimes;
    }


    removeEntryFromStorage(weekNo) {
        if (Array.isArray(this.localStorage === false)) return;

        updatedEntries = this.localStorage.filter(e => e.weekNumber != weekNo);
        this.localStorage = updatedEntries;
    }

    saveToLocalStorage(newHours) {
        // const currentStorage = localStorage.getItem(this.entryDate)

        this.localStorage.setItem(JSON.stringify(newHours));
    }

}


