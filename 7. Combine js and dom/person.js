export class Person {           
       
    get isWalking() {
        return this._isWalking == true ? `\n${this.name} ${this.lastName} is walking` : `\n${this.name} ${this.lastName} is idle`;
    }

    constructor(name, lastName, age){
        this.name = name;
        this.lastName = lastName;
        this.age = age;    
        this._isWalking = false;
    }           
    
    startWalking() {
        this._isWalking = true;        
    }    

    stopWalking() {
        this._isWalking = false;          
    }
}   

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

export class JoeDirt extends Person {
    /*
    constructor(){
        this.name = super.name;
        this.lastName = super.name;
        this.age = super.age;
    }   
    */
}
    




















  /**Done**

  Create a file called person.js. This file should export a class called "Person".
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

The person class has the following properties: 
    -First Name 
    -Last Name 
    -Age 
    
It (class or 'person' file?) also has the following functions:
        ~Start walking 
        ~Stop walking 

When start walking is called you need to set a private field "is walking" to true, 
    stop walking set's the same field back to false. 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
    The default value of this field is false and should be set to false in the constructor of the class.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor

Now add a read-only property (property with a getter but no setter called status. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get    
    If the field "is walking" is true the result of the property should be a string like this: 
        "NameValue LastNameValue is walking" 
            where NameValue and LastName value is the first name of the instance and the last name of the instance. 
    If the value is false the result of status should be "NameValue LastName is idle".

Please note that private members in javascript has a "_" prefix to the name. 
    For example, the private function "do something" would be "_doSomething".

        //test code1
    test = new Boolean(true);    
    get hello() {
        if (this.test){
            return 'world';
        } else {
            return 'not';
        }        
    }
    
    //test code2
    hello2 = new Boolean(false);    
    get hello2() {
        if (this.hello2){
            return 'world';
        } else {
            return 'not';
        }        
    }

   */
          