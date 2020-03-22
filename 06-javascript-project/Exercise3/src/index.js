import { JoeDirt, MileyCirus } from "./people.js";

const miley = new MileyCirus();
const joe = new JoeDirt();

joe.startWalking();
miley.startWalking();
console.log(joe.isWalking);
console.log(miley.isWalking);
console.log('');
joe.stopWalking();
miley.stopWalking();
console.log(joe.isWalking);
console.log(miley.isWalking);

// dispose?


