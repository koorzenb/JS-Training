export class ViewModel {
    /**
     * Form element to receive inputs from
     */
    get shoppingForm() {
        if (this._shoppingForm == null) {
            this._shoppingForm = document.querySelector('.shoppingForm');
        }
        return this._shoppingForm;
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

    set list(newValue) {
        this._list = newValue;
    }

    get itemName() {
        if (this._itemName == null) {
            this._itemName = document.querySelectorAll('#itemName');
        }
        return this._itemName;
    }

    set itemName(newValue) {
        this._itemName = newValue;
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
            elements: this.shoppingForm.concat(this.itemName),
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

    _submit(event) {
        event.preventDefault();
        const name = event.currentTarget.item.value;
        if (!name) return;

        const item = {
            name,
            id: Date.now(),
            complete: false,
        };

        this._displayItems(name);
    }

    /**
     * Click handler
     * @param {event} event 
     */
    _click(event) {
        // event.id = checkbox -> checkboxhandler
        //    else
        // close/delete item
    }

    /**
     * Pushes templates onto list
     */
    _displayItems(content) {        
            const clone = this.template.content.cloneNode(true);            
            const myText = clone.querySelector('.itemName');
            // ?? const myText = clone.this.itemName?
            myText.textContent = content; 
            console.log(this.list);           
            this.list.appendChild(clone);     
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
        console.log();
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
