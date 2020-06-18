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

export function unregisterEvents() {
    for (const item of event) {
        item.element.removeEventListener(item.event, item.callback);
        item.callback = null;
    }
}