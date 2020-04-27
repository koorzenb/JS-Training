export class Person {
    get isWalking() {
        return (this._isWalking == true) ? `${this.firstname} ${this.lastname} is walking` : `${this.firstname} ${this.lastname} is idle`;
    }

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this._isWalking = false;
    }

    walk() {
        this._isWalking = true; 
    }

    stop() {
        this._isWalking = false;
    }
}