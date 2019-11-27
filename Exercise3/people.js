/**       
Create another file called people.js and import the person class in this file. 

Create two new classes that inherit the "person" class. 
The one class should be called JoeDirt and the other MileyCirus. 
In the constructors of these classes set their name, last name and age properties to appropriate values. 
Remember to use the super keyword where appropriate. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
and https://javascript.info/class-inheritance


Hint: set the "is walking" field on the parent class but the first and last name on the persons. 
    Ensure you call the super on the persons' constructors.

In the index.html file import JoeDirt and MileyCirus and create instances for each one. 
    Tell them to move using the start walking function and print out their moving status. 
    Tell them to stop using the stop walking function and print out their moving status. 
*/
import {Person} from './person.js';

export class JoeDirt extends Person {
    /*
    constructor(){
        this.name = super.name;
        this.lastName = super.name;
        this.age = super.age;
    }   
    */
}

