export class ViewModel{

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
    
    dispose(){
        shoppingForm = null;
        template = null;
        list = null;
    }

    constructor(){
        this.submitHandle = this.submitHandle.
    }

    _init(){
        // properties in options used to track eventlisteners
        const options = {
            elements: {
                input: this.shoppingForm,  
                button: this.entryElements
            },
            eventTypes: {
                input: "submit",
                button: "click"
            },
            callbacks: {
                input: this.submithandler,
                button: this.clickHandler,
                },
        } 

        this._addEvents(options);
    }

    _submitHandle(e) {
        e.preventDefault();
        const name = e.currentTarget.item.value;
        if (!name) return;

        const item = {
            name,
            id: Date.now(),
            complete: false
        }

        e.
    }

    _click(event){
        //event.id = checkbox -> checkboxhandler
        //    else
        // close/delete item
    }

    _displayItems() {
        
    }

    _markAsComplete(id) {
        
    }

    _deleteItem(id) {
                    console.log();
        
    }

    /**
     * _addEvents receives an object of options, then creates eventlisteners for each option in the object
     * @param {Object} options
     */
    _addEvents(options) {
        for (const element of options.elements) {
            // const tag = element.nodeName.toLowerCase();
            element.addEventListener(
                options.eventTypes[`${tag}`],
                options.callbacks[`${tag}`]
            );
            this.registeredEvents.push({
                element: element,
                event: options.eventTypes[`${tag}`],
                callback: options.callbacks[`${tag}`]
            });
    }

    shoppingForm.addEventListener('submit',submitHandle);
}