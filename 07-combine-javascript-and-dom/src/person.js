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
     * Sets persons walking status to true
     */
    walk() {
        this._isWalking = true; 
    }
    
    /**
     * Sets persons walking status to false
     */
    stop() {
        this._isWalking = false;
    }
}