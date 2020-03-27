export class Person{

    get status(){
        return (this.status === true) ? `${this.firstname} ${this.lastname} is walking` : `${this.firstname} ${this.lastname} is idle`
    }

    constructor(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.status = false;
    }
    
    startWalking() {
        this.status = true;
    }

    stopWalking() {
        this.status = false;
    }
}
