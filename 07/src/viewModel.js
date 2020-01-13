import { validateInput, getRequiredValues, findActionButton } from './lib/applicationhelper.js';
import { Person } from './person/person.js';

export class ViewModel {
        /** requiredELements returns value of  previously registered query for all "required" elements. If no search for registered 
         * elements were previously perform, this getter will run a new qeury and assign value to private variable
         * @param {} none
         */
        get requiredElements() {
                if (this._requiredElements == null) {
                        this._requiredElements = Array.from(document.querySelectorAll('[required]'));
                }
                return this._requiredElements;
        }

        /** requiredElements set value of private variable _requiredElements to newValue.
         * @param {Function} newValue
         */
        set requiredElements(newValue) {
                this._requiredElements = newValue;
        }

        /** actionButtons returns value of  previously registered query for all "action" buttons. If no search for action buttons 
         * elements were previously perform, this getter will run a new qeury and assign value to private variable
         * @param {} none
         */
        get actionButtons() {
                if (this._actionButtons == null) {
                        this._actionButtons = Array.from(document.querySelectorAll('button'));
                }
                return this._actionButtons;
        }

        /** statusElement returns value of  previously registered query for the "status" element. If no search for "status"
         * elements were previously perform, this getter will run a new qeury and assign value to private variable
         * @param {} none
         */
        get statusElement() {
                if (this._statusElement == null) {
                        this._statusElement = document.querySelector('#status');
                }
                return this._statusElement;
        }
        
         /** statusElement set value of private variable _statusElement to newValue.
         * @param {Function} newValue
         */
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
                this.stopActionButton = findActionButton("stopPerson", this.actionButtons);
                this.walkActionButton = findActionButton("walkPerson", this.actionButtons);
        }

          /**
         * _click receives an event parameter, then executes class method based on target event.
         *  @param {Event} event
         */
        _click(event) {
                const attrib = event.target.getAttribute('action');
                this[`_${attrib}`](event);
        }

        /**
         * _keyup method receives no parameters, but listens on keyup. Once all required fields have some data, Create Person button is enabled
         * @param {} none
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
         * @param {} none
         */
        _walkPerson(event) {
                this.person.startWalking();
                this.statusElement.innerText = `${this.person.firstname} ${this.person.isWalking}`;
                this.stopActionButton.removeAttribute('disabled');              
                this.walkActionButton.setAttribute('disabled','');
                this.statusElement.removeAttribute('isIdle');
                this.statusElement.setAttribute('class','isWalking');  
        }   
        
        /**
         * _stopPerson receives no parameters, but sets person's walking status
         * @param {} none
         */
        _stopPerson(event) {
                this.person.stopWalking();
                this.statusElement.innerText = `${this.person.firstname} ${this.person.isWalking}`;
                this.walkActionButton.removeAttribute('disabled');
                this.stopActionButton.setAttribute('disabled','');   
                this.statusElement.removeAttribute('isWalking');
                this.statusElement.setAttribute('class','isIdle');   
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
                this.stopActionButton.removeAttribute('disabled');              
                this.walkActionButton.removeAttribute('disabled');
        }

        dispose() {
                // TODO: register events
                // Clear register
                // dispose events
        }
}
