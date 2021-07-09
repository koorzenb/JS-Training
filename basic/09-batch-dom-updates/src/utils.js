/**
 * Formats and returns date
 */
// export function formattedDate() {
//     const dateTimeFormat = new Intl.DateTimeFormat('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
//     const [{value: weekday},,{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(new Date); 
//     return `${weekday} ${month} ${day}, ${year }`;     
// }

export function formattedDate(previousTime) {
        const date = new Date();

        const weekday = [];
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        const calc = date.getMinutes() - previousTime.minutes 
        const minutes = calc < 10 ? `0${calc}` : `${calc}`

        const diff = `+${date.getHours() - previousTime.hours}:${minutes}`
        
        // return `${weekday[date.getDay()]} ${date.getDay()}, ${date.getHours()}:${date.getMinutes()} ${diff}`
        return `${weekday[date.getDay()]} ${date.getDay()}, @${date.getHours()}:${date.getMinutes()} -> ${diff}`
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