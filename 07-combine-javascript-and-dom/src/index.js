import { JoeDirt, MileyCirus } from "./people.js";

const miley = new MileyCirus();
const joe = new JoeDirt();

joe.startWalking();
miley.startWalking();
console.log('Setting people to walking...');
console.log(joe.isWalking);
console.log(miley.isWalking);
console.log('');
console.log('Setting people to stop...');
joe.stopWalking();
miley.stopWalking();
console.log(joe.isWalking);
console.log(miley.isWalking);

// dispose?
// miley = null;  // Error: "miley" is read-only
// miley.dispose(); // ReferenceError: constructor is not defined


