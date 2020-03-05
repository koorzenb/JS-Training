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

    /*
    get element(id) {
        if (this._element == null || this._id !== id) {
            this._element = document.querySelector(`[value='${id}']`);
            this._id = id;
        }
        return this._element;
    }

    set element(newValue){
        this._element = newValue;
    }
    */

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
        this.submitHandler = this._submit.bind(this);
        this.clickHandler = this._click.bind(this);
        this._init();
    }

    _init() {
        // properties in options used to track eventlisteners
        const options = {
            elements: {
                input: this.inputShoppingForm,
                checkbox: "",
                close: this.btnClose
            },
            eventTypes: {
                input: 'submit',
                checkbox: 'click',
                close: 'click',
            },
            callbacks: {
                input: this.submitHandler,
                checkbox: this.clickHandler,
                close: this.clickHandler,
            },
        };
        this._addEvents(options);
    }

    _submit(event) {
        event.preventDefault();
        const name = event.currentTarget.item.value;
        if (!name) return;

        this._appendItems(name);
        event.target.reset();
    }

    /**
     * Click handler
     * @param {event} event
     */
    _click(event) {        
        event.target.nodeName.toLowerCase() === 'button' 
            ? this._deleteItem(event.target.parentElement)
            : this._markAsComplete(event);
        }

    /**
     * Pushes templates onto list
     */
    _appendItems(itemContent) {
        const clone = this.template.content.cloneNode(true);
        const myText = clone.querySelector('.itemName');
        const btnClose = clone.querySelector('button');
        const inputCheck = clone.querySelector('input');
        const itemId = Array.from(clone.querySelectorAll('[value]'));
        const fragment = document.createDocumentFragment();
        myText.textContent = itemContent;
        fragment.appendChild(clone);
        this.list.appendChild(fragment);        
        this._addEventsForItem(btnClose);
        this._addEventsForItem(inputCheck);

        //dispose - get read-only error
        // myText = null;
        // btnClose = null;
        // inputCheck = null;
    }

    /**
     * Checks item as complete
     * @param {eventId} id
     */
    _markAsComplete(event) {
        console.log(event.target);
        const element = event.target;
        //element.getAttribute('checked') ? element.removeAttribute('checked') : element.setAttribute('checked','');// = !element.checked;
        // TODO: get CSS to work on checked
        element.getAttribute('checked') ? console.log('checked present') : console.log('checked not');// = !element.checked;
    }

    /**
     * Removes item when close button is clicked
     * @param {eventId} id
     */
    _deleteItem(element) {                
        element.parentNode.removeChild(element);        
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

    _addEventsForItem(element) {
        element.addEventListener('click', this.clickHandler);
        this.registeredEvents.push({
            element,
            event: 'click',
            callback: this.clickHandler,
        });        
    }
}
