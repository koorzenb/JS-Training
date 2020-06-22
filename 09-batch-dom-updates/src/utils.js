export function formattedDate() {
    const dateTimeFormat = new Intl.DateTimeFormat('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
    const [{value: weekday},,{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(new Date); 
    return `${weekday} ${month} ${day}, ${year }`;     
}

const events = [];

export function registerEvent(element, event, callback) {
    element.addEventListener(event, callback);
    events.push({
        element: element,
        event: event,
        callback: callback
    });
}

export function unregisterEvents(singleElement) {
    if(singleElement != null) {
        for (const item of events) {
            if(item.element == singleElement){
                item.element.removeEventListener(item.event, item.callback);
                item.callback = null;
            }
            break;
        }
    }
    else {
        for (const item of events) {
            item.element.removeEventListener(item.event, item.callback);
            item.callback = null;
        }
    }
}