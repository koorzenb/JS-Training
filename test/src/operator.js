import { Time } from "./time";

class Operator{

    minus(a, b) {
        return a-b;
    }

    showTime() {
        const time = new Time();
        console.log(time.toMinutes(2));
        console.log("sdf");
    }
}

module.exports = {Operator}