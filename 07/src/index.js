import { Person } from './person/person.js';
import { inputValidation, getConstructorValues, disposeListerners } from './lib/applicationhelper.js';

const inputElements = document.querySelectorAll('.input');
const btnCreatePerson = document.querySelector('#createPerson');
const btnWalkPerson = document.querySelector('#walkPerson');
const btnStopPerson = document.querySelector('#stopPerson');
let person;
let registeredEvents = [];

// listen on txtfields to enable createPerson
const toggleDisabledAttribute = () => {
        const isValid = inputValidation();

        if (isValid === true) {
                document.querySelector('#createPerson').removeAttribute('disabled');
        } else {
                document.querySelector('#createPerson').setAttribute('disabled', '');
        }
};

for (const element of inputElements) {
        element.addEventListener('keyup', toggleDisabledAttribute);
        registeredEvents.push({ element, event: 'keyup', handler: toggleDisabledAttribute });
}

//  listen on btn create person
// create person on click

function createPerson() {
        const values = getConstructorValues(['firstname', 'lastname', 'age']);
        person = new Person(...values);
        document.querySelector('#status').innerText = `${person.firstname} ${person.lastname} (${person.age}) ${
                person.isWalking
        }`;
        document.querySelector('#createPerson').setAttribute('disabled', '');
        for (const element of inputElements) {
                element.setAttribute('disabled', '');
        }
        disposeListerners(registeredEvents);
        registeredEvents = null;
        registeredEvents = [];
        console.log(registeredEvents);
}

registeredEvents.push({ element: btnCreatePerson, event: 'click', handler: createPerson });
btnCreatePerson.addEventListener('click', createPerson);

function toggleWalkStop(event) {
        if (event.target.id === 'walkPerson') {
                // run with do-while loop
                //      registeredEvents.push({ element: btnWalkPerson, event: 'click', handler: toggleWalkStop });
                //      console.log(registeredEvents);
                event.target.setAttribute('disabled', '');
                person.startWalking();
                document.querySelector('#status').innerText = `${person.firstname} ${person.isWalking}`;
                document.querySelector('#stopPerson').removeAttribute('disabled');
                // run with do-while loop
                //      disposeListerners(registeredEvents);
                //      registeredEvents = null;
                //      registeredEvents = [];
                //      console.log(registeredEvents);
        }

        if (event.target.id === 'stopPerson') {
                // run with do-while loop
                //      console.log(registeredEvents);
                //      registeredEvents.push({ element: btnStopPerson, event: 'click', handler: toggleWalkStop });
                event.currentTarget.setAttribute('disabled', '');
                person.stopWalking();
                document.querySelector('#status').innerText = `${person.firstname} ${person.isWalking}`;
                document.querySelector('#walkPerson').removeAttribute('disabled');
                // run with do-while loop
                //      disposeListerners(registeredEvents);
                //      registeredEvents = null;
                //      registeredEvents = [];
                //      console.log(registeredEvents);
        }
}

// remove if running do-while
btnWalkPerson.addEventListener('click', toggleWalkStop);
btnStopPerson.addEventListener('click', toggleWalkStop);

// while loop created to enable disposal of other buttons. Problem: will run continiously in background
// let stopWalking = true; // for robustness - not dependent on person.isWalking
// let loop = true;
// do {
//         if (stopWalking && loop) {
//                 btnWalkPerson.addEventListener('click', toggleWalkStop);
//                 stopWalking = false;
//                 loop = true;
//         }

//         if (!stopWalking && !loop) {
//                 btnStopPerson.addEventListener('click', toggleWalkStop);
//                 stopWalking = true;
//         }

//         loop = false;
// } while (true);
// disposeListerners(inputElements, 'keyup', toggleDisabledAttribute);
