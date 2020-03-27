import { Person } from "./person.js";

export class JoeDirt extends Person{
    constructor() {
        super("Joe","Dirt", 30);
    }

    dispose(){
        super.dispose();
    }
}

export class MileyCirus extends Person{
    constructor() {
        super("Miley","Cirus", 24);
    }

    dispose(){
        super.dispose();
    }
}
