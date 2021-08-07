import { Dates, DateType} from "./enums.js";

/**
 * Formats and returns date
 */
export function formattedDate() {
        const date = new Date();
        const enumDate = new Dates();        
        return `${enumDate.get(DateType.WEEKDAY, date.getDay())} ${enumDate.get(DateType.MONTH, date.getMonth())} ${date.getDay()}, ${date.getFullYear()}`;
}

/**
 * Registers eventlisteners against elements and 
 * @param {HTML element} element - element against which the eventlistner is being registered
 * @param {string} event - event type
 * @param {function} callback - function to call
 */
const events = [];
export function registerEvent(element, event, callback) {
    element.addEventListener(event, callback);
    events.push({
        element: element,
        event: event,
        callback: callback
    });
}

/**
 * Unregister and disposes either an eventlistener on a single element; 
 *  or dispose all registered eventlisteners 
 * @param {*} singleElement 
 */
export function unregisterEvents(singleElement,event) {
    if(singleElement != null) {
        for (const item of events) {
            if(item.element == singleElement && item.event == event){
                item.element.removeEventListener(item.event, item.callback);
                item.callback = null;
                const index = events.indexOf(item);
                events.splice(index,1);
                break;
            }
        }
    }
    else {
        for (const item of events) {
            item.element.removeEventListener(item.event, item.callback);
            item.callback = null;
        }
    }
}