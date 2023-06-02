// import {Person} from "./person.js";

class ViewModel {

    constructor() {
        this._init();
    }

    _init() {
        this.submitButton = document.querySelector('#submit');
        this.submitHandler = this._submit.bind(this);
        this.submitButton.addEventListener('click', this.submitHandler);
        this.results = document.querySelector('#results');
        this.person = new Person;
        this.proxy = new Proxy(this.person, this._setupValidator());
    }

    dispose() {
        this.submitButton.removeEventListener('submit', this.submitHandler);
        this.submitHandler = null;
        this.results = null;
        this.submitButton = null;
        this.person = null;
    }

    _submit(event) {
        event.preventDefault();
        this._queryInputs();
        this._validateInputValues();
    }

    _validateInputValues() {
        const valuesToIterate = ["name", "lastName", "age"];
        this.person.result = true;

        for (const value of valuesToIterate) {
            this.proxy[value] = this[`${value}`];
        }

        if (this.proxy.result === true) {
            this.results.textContent = `Found you John`;
        } else {
            this.results.textContent = "";
            if (this.proxy._age === 30) {
                this.ageInput.value = 30;
            }
        }
    }

    _queryInputs() {
        const nameInput = document.querySelector('#name');
        this.name = nameInput.value;
        const lastNameInput = document.querySelector('#lastName');
        this.lastName = lastNameInput.value;
        this.ageInput = document.querySelector('#age');
        this.age = this.ageInput.value;
    }

    _setupValidator() {
        const validator = {
            set(obj, prop, value) {

                obj[prop] = value;
                if (obj.result === true) {

                    if (prop === 'age') {
                        value = value.toString();
                        if (value !== "20") {
                            obj.result = false;
                        }
                    }

                    if (prop === 'name') {
                        if (typeof value !== 'string') {
                            throw new TypeError('The name is not an string');
                        }
                        if (value !== "John") {
                            obj.result = false;
                        }
                    }

                    if (prop === 'lastName') {
                        if (typeof value !== 'string') {
                            throw new TypeError('The lastname is not an string');
                        }
                        if (value !== "Doe") {
                            obj.result = false;
                        }
                    }
                }

                if (prop === "age" && value > 30) {
                    obj[prop] = 30;
                }

                return true;    // must always be true
            }
        };

        return validator;   // return to _init
    }
}