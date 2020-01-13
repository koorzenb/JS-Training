export class Person {
    /**
     * returns _firstname
     * @Param {}
     * @Returns _firstname
     */
    get firstname() {
        return this._firstname;
    }

    /**
     * sets _firstname to newValue
     * @param {String} newValue
     */
    set firstname(newValue) {
        this._firstname = newValue;
    }

    /**
     * returns _lastname
     * @param {} none
     * @returns {String} _lastname
     */
    get lastname() {
        return this._lastname;
    }

    /**
     * sets _lastname to newValue
     * @param {String} newValue;
     */
    set lastname(newValue) {
        this._lastname = newValue;
    }

    /**
     * returns _age
     * @param {} none
     * @returns {String} _age
     */
    get age() {
        return this._age;
    }

    /**
     * sets _age to newValue
     * @param {String} newValue;
     */
    set age(newValue) {
        this._age = newValue;
    }

    /**
     * returns the status of _isWalking
     * @param {} none
     * @returns {String}
     */
    get isWalking() {
        return this._isWalking === true ? `is walking` : ` is idle`;
    }

    /**
     * isWalking sets _isWalking to newValue
     * @param {String} newValue;
     */
    set isWalking(newValue) {
        this._isWalking = newValue;
    }

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.isWalking = false;
    }

    /**
     * Responsible for diposal of properties on closing
     * @param {}
     */
    dispose() {
        delete this.firstname;
        delete this.lastname;
        delete this.age;
        delete this.isWalking;
    }

    /**
     * startWalking sets _isWalking to true
     * @param {}
     */
    startWalking() {
        this._isWalking = true;
    }

    /**
     * stopWalking sets _isWalking to false
     * @param {}
     */
    stopWalking() {
        this._isWalking = false;
    }
}
