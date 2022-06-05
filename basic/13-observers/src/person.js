export class Person {
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    constructor(name, lastName, age) {
        this._name = name;
        this._lastName = lastName;
        this._age = age;
    }


}