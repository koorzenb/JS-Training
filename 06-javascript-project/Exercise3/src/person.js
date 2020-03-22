export class Person {

    get isWalking() {
        return this._isWalking === true ? `${this.name} ${this.lastname} is walking` : `${this.name} ${this.lastname} is idle`     
    }

    constructor(name, lastname, age) {
        this.name = name;
        this.lastname = lastname;
        this.age = age; 
        this._isWalking = false;
    }

    dispose() {
        constructor = null();
    }

    startWalking(){
        this._isWalking = true;
    }

    stopWalking(){
        this._isWalking = false;
    }
}