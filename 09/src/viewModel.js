export class ViewModel {
    get shoppingForm() {
        if (this._shoppingForm == null) {
            this._shoppingForm = document.querySelector('.shoppingForm');
        }
        return this._shoppingForm;
    }

    get template() {
        if (this._template == null) {
            this._template = document.querySelector('#item');
        }
        return this._template;
    }

    get list() {
        if (this._list == null) {
            this._list = document.querySelector('.list');
        }
        return this._list;
    }

    set list(newValue) {
        this._list = newValue;
    }

    get entryElements() {
        if (this._entryElements == null) {
            this._entryElements = document.querySelectorAll('.checkBoxElements');
        }
        return this._entryElements;
    }

    set entryElements(newValue) {
        this._entryElements = newValue;
    }

    dispose() {
        this.shoppingForm = null;
        this.template = null;
        this.list = null;
    }

    constructor() {
        // registeredEvents = [];
        // ignore "bind" for now. Ask Rabie later to explain
        this.submithandler = this._submit.bind(this);
        this.clickHandler = this._click.bind(this);
    }

    _init() {
        // properties in options used to track eventlisteners
        const options = {
            elements: this.shoppingForm.concat(this.entryElements),
            // TODO: left on purpose:
            // {
            //     input: this.shoppingForm,
            //     button: this.entryElements
            // }
            // is there a way to iterate through obj instead of creating array
            // and still be able to use in _addEvents?
            eventTypes: {
                input: 'submit',
                button: 'click',
            },
            callbacks: {
                input: this.submithandler,
                button: this.clickHandler,
            },
        };

        this._addEvents(options);
    }

    /**
     * _addEvents receives an object of options, then creates eventlisteners for each option in the object
     * @param {Object} options
     */
    _addEvents(options) {
        for (const element of options.elements) {
            const tag = element.nodeName.toLowerCase(); // button/input
            element.addEventListener(options.eventTypes[`${tag}`], options.callbacks[`${tag}`]);
            this.registeredEvents.push({
                element,
                event: options.eventTypes[`${tag}`],
                callback: options.callbacks[`${tag}`],
            });
        }
    }
}
