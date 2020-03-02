export class ViewModel {
    /**
     * Form element to receive inputs from
     */
    get inputShoppingForm() {
        if (this._inputShoppingForm == null) {
            this._inputShoppingForm = document.querySelector('.shoppingForm');
        }
        return this._inputShoppingForm;
    }

    /**
     * Template to use to create entries
     */
    get template() {
        if (this._template == null) {
            this._template = document.querySelector('#item');
        }
        return this._template;
    }

    /**
     * Area in DOM where to insert entries
     */
    get list() {
        if (this._list == null) {
            this._list = document.querySelector('.list');
        }
        return this._list;
    }

    get itemName() {
        if (this._itemName == null) {
            this._itemName = document.querySelector('.itemName');
        }
        return this._itemName;
    }

    get btnClose() {
        if (this._btnClose == null) {
            this._btnClose = document.querySelectorAll('closeItem');
        }
        return this._btnClose;
    }

    dispose() {
        this.inputShoppingForm = null;
        this.btnClose = null;
        this.template = null;
        this.itemName = null;
        this.list = null;
    }

    constructor() {
        this.registeredEvents = [];
        // ignore "bind" for now. Ask Rabie later to explain
        this.submitHandler = this._submit.bind(this);
        this.clickHandler = this._click.bind(this);
        this._init();
    }

    _init() {
        // properties in options used to track eventlisteners
        const options = {
            elements: {
                input: this.inputShoppingForm,
                // TODO: add close buttons
            },
            eventTypes: {
                input: 'submit',
                button: 'click',
            },
            callbacks: {
                input: this.submitHandler,
                button: this.clickHandler,
            },
        };
        this._addEvents(options);
    }

    _submit(event) {
        event.preventDefault();
        const name = event.currentTarget.item.value;
        if (!name) return;

        const item = {
            name,
            id: Date.now(),
            complete: false,
        };

        this._appendItems(name, item.id);
        // this._addEventsForItem(item.id);
        event.target.reset();
    }

    /**
     * Click handler
     * @param {event} event
     */
    _click(event) {
        if (event.target.nodeName.toLowerCase() === 'button') {
            this._deleteItem(event.target.getAttribute('value'));
        }

        // event.id = checkbox -> checkboxhandler
        //    else
        // close/delete item
    }

    /**
     * Pushes templates onto list
     */
    _appendItems(itemContent, id) {
        const clone = this.template.content.cloneNode(true);
        const myText = clone.querySelector('.itemName');
        const btnClose = clone.querySelector('button');
        // FIXME: const myText = clone.this.itemName;
        const itemId = Array.from(clone.querySelectorAll('[value]'));
        myText.textContent = itemContent;
        for (const elements of itemId) {
            elements.setAttribute('value', id);
        }
        this.list.appendChild(clone);
        this._addEventsForItem(btnClose);
    }

    /**
     * Checks item as complete
     * @param {eventId} id
     */
    _markAsComplete(id) {}

    /**
     * Removes item when close button is clicked
     * @param {eventId} id
     */
    _deleteItem(id) {        
        const element = document.querySelector(`[value='${id}']`);
        element.parentElement.removeChild(element);        
    }

    /**
     * _addEvents receives an object of options, then creates eventlisteners for each option in the object
     * @param {Object} options
     */
    _addEvents(options) {
        this.inputShoppingForm.addEventListener('submit', this.submitHandler);
        this.registeredEvents.push({
            element: this.inputShoppingForm,
            event: 'submit',
            callback: this.submitHandler,
        });
    }

    _addEventsForItem(btnClose) {
        btnClose.addEventListener('click', this.clickHandler);
        this.registeredEvents.push({
            element: btnClose,
            event: 'click',
            callback: this.clickHandler,
        });
        // console.log(this.registeredEvents);
    }
}
