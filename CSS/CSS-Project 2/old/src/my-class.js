import {writeMessage} from "./worker.js";

export class MyClass {
    constructor() {
        console.log("created");
        this.startWorker();
    }

    dispose() {
    }

    startWorker() {
        let w;
        if (typeof(Worker) !== "undefined") {
          if (typeof(w) == "undefined") {
            w = new Worker("./worker.js");
          }
          w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
          }
        }   
        else {
            writeMessage("my lastname is");
            console.log(writeMessage.last);
            
        }
    }
}