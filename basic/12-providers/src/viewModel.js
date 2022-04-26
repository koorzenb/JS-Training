import {formattedDate, registerEvent, unregisterEvents} from "./utils/system-utils.js";
export class ViewModel {

    constructor() {
        this.init();
        console.log("viewModel started");
    }

    dispose() {
        unregisterEvents(addButton, "click");
        delete this.clickHandler;
    }

    /**
     * Initializes view model
     */
    init() {
        this.clickHandler = this.click.bind(this);
        registerEvent(addButton, "click", this.clickHandler);
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
}