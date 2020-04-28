export class Person {

    /**
     * @return Returns a string of the persons's status 
     */
    get isWalking() {
        return (this._isWalking == true) ? `${this.firstname} ${this.lastname} is walking` : `${this.firstname} ${this.lastname} is idle`;
    }

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this._isWalking = false;
    }
    
    /**
     * Sets persons walking status 
     */
    walk(action) {
        action == true ? this._isWalking = true : this._isWalking = false; 
    }
}