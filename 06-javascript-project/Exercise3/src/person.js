export class Person {

    constructor(name, lastname, age) {
        this.name = name;
        this.lastname = lastname;
        this.age = age; 
    }

    dispose() {
        constructor = null();
    }

    startWalking(){
        console.log('working');
    }

    stopWalking(){

    }
}