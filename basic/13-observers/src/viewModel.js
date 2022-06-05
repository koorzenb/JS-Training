import {Person} from "./person.js";

export class ViewModel {

    constructor(person) {
        this.person = new Person;
        this._init();
    }

    _init() {
        this.submitButton = document.querySelector('#submit');
        this.submitHandler = this._submit.bind(this);
        this.submitButton.addEventListener('submit', this.submitHandler);
        this.results = document.querySelector('#results');
    }

    dispose() {
        this.submitButton.removeEventListener('submit', this.submitHandler);
        this.submitHandler = null;
        this.results = null;
        this.submitButton = null;
    }

    _submit(event) {
        event.preventDefault();
        const name = this.nameInput.value;
        const lastName = this.lastNameInput.value;
        const age = this.ageInput.value;
        this.person.name = name;
        this.person.lastName = lastName;
        this.person.age = age;
        this.results.innerText = this.person.getInfo();
    }
}