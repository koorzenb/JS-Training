export function inputValidation() {
        let count = 0;
        const inputs = document.querySelectorAll('[required]');

        for (const input of inputs) {
                if (input.value !== null && input.value !== '') {
                        count += 1;
                }
        }

        return count === inputs.length;
}

export function getConstructorValues(options) {
        const values = [];

        for (const item of options) {
                values.push(document.querySelector(`#${item}`).value);
        }
        return values;
}

export function disposeListerners(options) {
        for (const item of options) {
                item.element.removeEventListener(item.event, item.handler);
        }
}
