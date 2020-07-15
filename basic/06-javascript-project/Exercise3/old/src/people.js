import { Person } from "./person.js";

export class JoeDirt extends Person{
    constructor(){
        super("Joe","Dirt", 30);
    }
    
    dispose(){
        constructor = null;
    }

export class MileyCirus extends Person{
    constructor(){
        super("Miley","Cirus", 24);
    }

    dispose(){
        constructor = null;
    }
}

console.log('what is garbage collection?');
console.log('dispose = clear relationships (obj, eventl), not string, int, etc');



 