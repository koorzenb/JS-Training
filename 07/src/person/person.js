export class Person {
        get firstname() {
                return this._firstname;
        }

        set firstname(newValue) {
                this._firstname = newValue;
        }

        get lastname() {
                return this._lastname;
        }

        set lastname(newValue) {
                this._lastname = newValue;
        }

        get age() {
                return this._age;
        }

        set age(newValue) {
                this._age = newValue;
        }

        get isWalking() {
                return this._isWalking === true ? `${this.firstname} is walking` : ` is idle`;
        }

        set isWalking(newValue) {
                this._isWalking = newValue;
        }

        constructor(firstname, lastname, age) {
                this.firstname = firstname;
                this.lastname = lastname;
                this.age = age;
                this.isWalking = false;
        }

        dispose() {
                delete this.firstname;
                delete this.lastname;
                delete this.age;
                delete this.isWalking;
        }

        startWalking() {
                this._isWalking = true;
        }

        stopWalking() {
                this._isWalking = false;
        }
}
