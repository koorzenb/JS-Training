import { Person } from './person/person.js';

const txtInputs = document.querySelectorAll('.input');
const btnCreatePerson = document.querySelector('#createPerson');
// listen on txtfields to enable createPerson
const handler = () => {
        console.log('clicked here');
};

txtInputs.forEach(function(input) {
        input.addEventListener('change', handler);
});

//  listen on btn create person
let person;

function createPerson() {
        const handle = () => {
                const firstname = document.querySelector('#firstname');
                const lastname = document.querySelector('#lastname');
                const age = document.querySelector('#age');
                person = new Person(firstname, lastname, age);
                document.querySelector('#status').innerHTML = `${person}`;
        };

        btnCreatePerson.addEventListener('click', handle);
}

createPerson();
// create person on click
// output status
// listen on walk/stop
// output status
