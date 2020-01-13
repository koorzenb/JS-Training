export function validateInput(elements) {
        let count = 0;

        for (const element of elements) {
                if (element.value != null && element.value != '') {
                        count++;
                }
        }
        return count === elements.length;
}

export function getRequiredValues(elements) {
        const values = [];
        for (const el of elements) {
                values.push(el.value);
        }
        return values;
}

export function findActionButton(myAction, actionButtons) {
        return actionButtons.find( (el) => {
                if (el.getAttribute('action') === myAction) {
                        return el;
                }
        });                
}