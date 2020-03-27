export class Person{

    get status(){
        return (this._status === true) ? `${this.firstname} ${this.lastname} is walking` : `${this.firstname} ${this.lastname} is idle`
    }

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this._status = false;
    }
    
    startWalking() {
        this._status = true;
    }

    stopWalking() {
        this._status = false;
    }
}
