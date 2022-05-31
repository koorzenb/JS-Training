export class ViewModel {

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        this.notify();
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
        this.notify();
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
        this.notify();
    }
}