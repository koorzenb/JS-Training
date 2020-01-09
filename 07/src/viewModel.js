export class ViewModel {
        get requiredElements() {
                if (this._requiredElements == null) {
                        this._requiredElements = Array.from(document.querySelectorAll('[required]'));
                }
                return this._requiredElements;
        }

        set requiredElements(newValue) {
                this._requiredElements = newValue;
        }

        get actionButtons() {
                if (this._actionButtons == null) {
                        this._actionButtons = Array.from(document.querySelectorAll('button'));
                }
                return this._actionButtons;
        }

        constructor() {
                this.clickhandler = this._click.bind(this);
                this.keyuphandler = this._keyup.bind(this);
                this._init();
        }

        _init() {
                const options = {
                        elements: this.requiredElements.concat(this.actionButtons),
                        eventTypes: {
                                input: 'keyup',
                                button: 'click',
                        },
                        callbacks: {
                                input: this.keyuphandler,
                                button: this.clickhandler,
                        },
                };

                this._addEvents(options);
        }

        _click(event) {
                const attrib = event.target.getAttribute('action');
                this[`_${attrib}`]();
        }

        _keyup(event) {
                console.log(event);
        }

        _addEvents(options) {
                for (const element of options.elements) {
                        const tag = element.nodeName.toLowerCase();
                        element.addEventListener(options.eventTypes[`${tag}`], options.callbacks[`${tag}`]);
                }
        }

        _walkPerson() {
                console.log('Walking');
        }

        _stopPerson() {
                console.log('stopped');
        }

        _createPerson() {
                console.log('created');
        }
}
