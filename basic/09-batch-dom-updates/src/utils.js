/**
 * Formats and returns date
 */
export function formattedDate() {
    const dateTimeFormat = new Intl.DateTimeFormat('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
    const [{value: weekday},,{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(new Date); 
    return `${weekday} ${month} ${day}, ${year }`;     
}

const events = [];

/**
 * Registers eventlisteners against elements and 
 * @param {*} element - element against which the eventlistner is being registered
 * @param {*} event - event type
 * @param {*} callback - function to call
 */
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