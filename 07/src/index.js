import { Person } from './person/person.js';
import { inputValidation, getConstructorValues, disposeListerners } from './lib/applicationhelper.js';

const inputElements = document.querySelectorAll('.input');
const btnCreatePerson = document.querySelector('#createPerson');
let person;
let registeredEvents = [];

// listen on txtfields to enable createPerson
const toggleDisabledAttribute = e => {
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

function createPerson(event) {
        const values = getConstructorValues(['firstname', 'lastname', 'age']);
        person = new Person(...values);
        document.querySelector('#status').innerText = `${person.firstname} ${person.isWalking}`;
        disposeListerners(registeredEvents);

        registeredEvents = null;
        console.log(registeredEvents);
}

registeredEvents.push({ element: btnCreatePerson, event: 'click', handler: createPerson });
btnCreatePerson.addEventListener('click', createPerson);

console.log(registeredEvents);
// disposeListerners(inputElements, 'keyup', toggleDisabledAttribute);
