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
 * @param {DOM Element} elements - element(s) to remove
 * @param {string} - event type
 */
export function unregisterEvents(elements, event) {
    if (elements == null || event == null || events[0] == null) return;

    elements = Array.isArray(elements) === true ? elements : [elements];

    for (const item of events) {
        if (item.element == elements && item.event == event) {
            item.element.removeEventListener(item.event, item.callback);
            item.callback = null;
            const index = events.indexOf(item);
            events.splice(index, 1);
            break;
        }
    }
}