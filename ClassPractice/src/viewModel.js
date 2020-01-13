import { CLIEngine } from 'eslint';
import { validateInput, getRequiredValues } from './lib/applicationhelper.js';
import { Person } from './person/person.js';

export class ViewModel {
        get requiredElements() {
                if (this._requiredElements == null) {
                        this._requiredElements = Array.from(document.querySelectorAll('[required]'));
                }
                return this._requiredElements;
        }

        // TODO - BK should I write doc summary for getters and setters too?
        set requiredElements(newValue) {
                this._requiredElements = newValue;
        }

        get actionButtons() {
                if (this._actionButtons == null) {
                        this._actionButtons = Array.from(document.querySelectorAll('button'));
                }
                return this._actionButtons;
        }

        get statusElement() {
                if (this._statusElement == null) {
                        this._statusElement = document.querySelector('#status');
                }
                return this._statusElement;
        }

        set statusElement(newValue) {
                this._statusElement = newValue;
        }

        constructor() {
                this.clickhandler = this._click.bind(this);
                this.keyuphandler = this._keyup.bind(this);
                this._init();
        }

        /**
         * _init method creates an object of options used for eventlisteners, then creates eventlisteners:
         *      - elements: elements required to listen on
         *      - eventTypes: type of events to listen for
         *      - callbacks: callback methods to use
         *  @param {}
         */ _init() {
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

        /**
         * _init method creates an object of options used for eventlisteners, then creates eventlisteners:
         *      - elements: elements required to listen on
         *      - eventTypes: type of events to listen for
         *      - callbacks: callback methods to use
         *  @param {}
         */ _click(event) {
                const attrib = event.target.getAttribute('action');
                this[`_${attrib}`](event);
        }

        /**
         * _keyup method receives an event parameter, then executes relevant class method.
         * @param {Event} event
         */
        _keyup(event) {
                this.isValid = validateInput(this.requiredElements);
                const btn = this.actionButtons.find(element => {
                        if (element.getAttribute('action') === 'createPerson') {
                                return element;
                        }
                        return false;
                });

                this.isValid === true ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', !this.isValid);
        }

        /**
         * _addEvents receives an object of options, then creates eventlisteners for each option in the object
         * @param {Object} options
         */
        _addEvents(options) {
                for (const element of options.elements) {
                        const tag = element.nodeName.toLowerCase();
                        element.addEventListener(options.eventTypes[`${tag}`], options.callbacks[`${tag}`]);
                }
        }

        /**
         * _walkPerson receives no parameters, but sets person's walking status
         * @param {}
         */
        _walkPerson(event) {
                this.person.startWalking();
                this.statusElement.innerText = `${this.person.firstname} ${this.person.isWalking}`;
        }

        /**
         * _stopPerson receives no parameters, but sets person's walking status
         * @param {}
         */
        _stopPerson(event) {
                this.person.stopWalking();
                this.statusElement.innerText = `${this.person.firstname} ${this.person.isWalking}`;
        }

        /**
         * _createPerson receives an event parameter, then creates a new Person and disables the event.target button
         * @param {Event} event
         */
        _createPerson(event) {
                const values = getRequiredValues(this.requiredElements);
                this.person = new Person(...values);
                event.target.setAttribute('disabled', true);
                for (const element of this.requiredElements) {
                        element.setAttribute('disabled', '');
                }
                this._toggleDisabledButtons(event);
        }

        // eslint-disable-next-line class-methods-use-this
        _toggleDisabledButtons() {
                // TODO - BK no need to query document as we already have an array of buttons. Find buttons in array and manipulate.
                // get element(1) event. disable that button
                // console.log(event);
                // enable other button
                //      - loop thru array and find element(1)
                //      - remove element(1)
                //      - set attri remaining element(2)
                // this.actionButtons.find(element => {
                //         if (element.getAttribute('action') === 'walkPerson') {
                //                 element.set
                //         }
                //         return false;
                // }
                document.querySelector('[action="walkPerson"]').removeAttribute('disabled');
                document.querySelector('[action="stopPerson"]').removeAttribute('disabled');
        }

        dispose() {
                // TODO: register events
                // Clear register
                // dispose events
        }
}
