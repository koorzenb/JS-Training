export class Person {
        constructor(firstname, lastname, age) {
                this.firstname = firstname;
                this.lastname = lastname;
                this.age = age;
                this._isWalking = false;
        }

        get firstname() {
                return this._firstname;
        }

        get lastname() {
                return this._lastname;
        }

        get age() {
                return this._age;
        }

        startWalking() {
                this._isWalking = true;
        }

        stopWalking() {
                this._isWalking = false;
        }

        get isWalking() {
                return this._isWalking === true ? `${this.firstname} is walking` : `${this.firstname} is idle`;
        }
}
