import { formattedDate, registerEvent, unregisterEvents } from "./utils/system-utils.js";
import { Dates, DateType } from "./utils/enums.js";
import { DateTime } from "./utils/luxon.js";

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
            this._currentStorage = localStorage.getItem(this.entryDate)
            this._currentStorage = JSON.parse(this._currentStorage);
        }
        return this._currentStorage == null ? {} : this._currentStorage
    }

    set localStorage(newValue) {
        this._currentStorage = newValue;
        localStorage.setItem(this.entryDate, JSON.stringify(newValue));
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
        delete this.localStorage;
        delete this.fragment;
        delete this.dt;
    }

    /**
     * Initializes view model
     */
    init() {
        this. dt = new DateTime({});
        const addButton = document.querySelector("#addItem");
        this.itemsList = document.querySelector("ul");
        this.clickHandler = this._click.bind(this);
        this.formInput = document.querySelector("form input");
        registerEvent(addButton, "click", this.clickHandler);
        this.itemTemplate = document.querySelector("template#item");
        this.showEntries();
    }

    getWeeklyEntries() {
        const thisWeek = this.dt.weekNumber;
        const entries = [];

        const length = Object.keys(this.localStorage).length
        let lastItem = length !== 0 ? this.localStorage[length - 1] : {};  //TODO: Length == 0? lastItem == {} and contidition below falls ovr

        //thisWeek == null, meaning now new records for this week
        if ( lastItem == null || lastItem.week != thisWeek) {
            const enumDate = new Dates();
            const offset = this.dt.weekday - 1;   // days to substract so we start calc from Monday        
            
            let count = 0;
            for (const day of DateType.WEEKDAY) {
                const localOffset = count - offset
                const offsetDate = this.dt.plus({day : localOffset }).day;  // todayDate - offset - count //TODO: set offsetDate to correct represent offset ie, -3
                const paddedDate = offsetDate < 10 ? `0${offsetDate}` :  offsetDate;
                const item = {
                    day: `${enumDate.get(DateType.WEEKDAY, DateType.WEEKDAY.indexOf(day))}`,
                    id: `${paddedDate}${this.dt.month}${this.dt.year}`,
                    dt: DateTime.now().plus({day: localOffset}),
                    offsetDate,
                    offset: localOffset
                }
                entries.push(item);
                count++;
            }
        } else {
            entries = lastItem;
        }

        return entries;
    }

    showEntries() {
        const data = this.getWeeklyEntries();

        this.fragment = new DocumentFragment();
        for (const entry of data) {
            this.appendItem(entry);
        }
        this.itemsList.appendChild(this.fragment);
        document.querySelector("#week-descriptor").innerText = `Week ${data[0].dt.weekNumber}`;  //TODO: use data-content
        const startDate = data[0].dt.toLocaleString({ month: 'short', day: '2-digit'})
        const endDate = data[6].dt.toLocaleString({ month: 'short', day: '2-digit'})
        document.querySelector("#main-title").innerText = `${startDate} - ${endDate}`

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
        const entry = this.calculateHours(this.formInput.value)
        this.localStorage = entry;
        this.appendItem(entry);
        this.formInput.value = "";


        // save in new format
        // getweek()
        // get localStorage
        // find indexof week in localStorage
        // find index of day in week
        // if id exist - overwrite
        //get weeknumber from localStorage
        //render before new inputs
    }

    /**
     * 
     * @param {{_day: string, _id: number, loggedTimes: {start: number, end: number, _difference:number}}} entry 
     * @returns 
     */
    appendItem(entry) {
        const clone = this.itemTemplate.content.cloneNode(true);
        const loggedTimes = entry.loggedTimes;

        if (loggedTimes?.end != null || loggedTimes?.start == null || loggedTimes == null) {
            let existingItem;
            try {
                existingItem = document.getElementById(`${id}`);
            } catch (error) { }

            if (existingItem) this.itemsList.removeChild(existingItem);
        }

        if (entry.loggedTimes?.difference != null) {
            const item = document.getElementById(`${entry.id}`);
            this.itemsList.removeChild(item);
            clone.querySelector(".item-description").innerText = `From ${entry.loggedTimes.start} - ${entry.loggedTimes.end} = ${entry.loggedTimes.difference} hours`;
            this.formInput.setAttribute('placeholder', "Start time");
            console.log("Times calculated");
        } else if (entry.loggedTimes?.start != null){
            clone.querySelector(".item-description").innerText = `From ${entry.loggedTimes.start} until...`;
            this.formInput.setAttribute('placeholder', "End time");
            console.log("Start time saved");
        } else {
            clone.querySelector(".item-description").innerText = `Nothing logged...`;
        }

        clone.querySelector(".item-date").innerText = entry.dt.toLocaleString({ weekday: 'long', month: 'short', day: '2-digit'});
        clone.querySelector("li").setAttribute("id", entry.id);

        this.fragment.appendChild(clone);        
    }

    calculateHours(newValue) {
        const date = new Date();
        const id = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`
        let loggedTimes = this.localStorage.loggedTimes ?? {};

        if (loggedTimes?.end != null || loggedTimes?.start == null || loggedTimes == null) {
            loggedTimes = {};
            loggedTimes.start = parseInt(newValue);
        } else if (loggedTimes?.start != null) {
            loggedTimes.end = parseInt(newValue);
            loggedTimes.difference = loggedTimes.end - loggedTimes.start;
            console.log("End time saved");
        }

        return { id, loggedTimes, week: this.dt.weekNumber }
    }




    saveToLocalStorage(newHours) {
        // const currentStorage = localStorage.getItem(this.entryDate)

        this.localStorage.setItem(this.entryDate, JSON.stringify(newHours));
    }

}

