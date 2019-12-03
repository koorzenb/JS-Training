
import {Person} from './person.js';

export function getInputValue(){
    var inputVal = document.getElementById("myInput").value;
    
    // Displaying the value
    alert(inputVal);
}

export class JoeDirt extends Person {
    /*
    constructor(){
        this.name = super.name;
        this.lastName = super.name;
        this.age = super.age;
    }   
    */
}

