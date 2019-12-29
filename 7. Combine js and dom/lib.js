// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// TODO: remove global vraiables
// TODO: on HTML, add <form>. Test "required" functionality

class Person {
        get isWalking() {
                return this._isWalking === true
                        ? `\n${this.name} ${this.lastName} is walking`
                        : `\n${this.name} ${this.lastName} is idle`;
        }

        constructor(cName, cSurname, cAge) {
                this.name = cName;
                this.surname = cSurname;
                this.age = cAge;
                this._isWalking = false;
        }

        startWalking() {
                this._isWalking = true;
        }

        stopWalking() {
                this._isWalking = false;
        }
}

const firstname = document.querySelector('.firstname');
const surname = document.querySelector('.surname');
const age = document.querySelector('.age');
const status = document.querySelector('.status');
const input = document.querySelectorAll('input');
const frmCreatePerson = document.querySelector('[name="createPerson"]');
const btnWalk = document.querySelector('.walk');
const btnStop = document.querySelector('.stop');

// Dummy person
firstname.value = 'Barend';
surname.value = 'Koorzen';

// wait on 3x textfields to contain data
// enable CreatePerson button
// function waitOnData() {
//         if (surname.value !== '' && name.value !== '' && age.value !== '') {
//                 return true;
//         }
//         return false;
// }

function walkHandler() {
        const clickHandler = () => {
                console.log('clicked here');
        };

        btnWalk.addEventListener('click', clickHandler);
}

function stopHandler() {
        const clickHandler = () => {
                console.log('clicked here');
        };

        btnStop.addEventListener('click', clickHandler);
}

function createPersonHandler() {
        const clickHandler = e => {
                e.preventDefault();
                const person = new Person(firstname.value, surname.value, age.value);
                status.value = `${person.name} ${person.surname} created`;
                frmCreatePerson.setAttribute('disabled', '');
                console.log(frmCreatePerson);
                // TODO: register seperate eventlistener for statements below to seperate concern
                btnStop.removeAttribute('disabled');
                btnWalk.removeAttribute('disabled');
                walkHandler();
                stopHandler();
        };
        frmCreatePerson.addEventListener('submit', clickHandler);
}

createPersonHandler();

/**
 * Compare the func below to func above. This example breaks code. Why?
 * 
 * function createCreatePersonHandler() {
        this.clickHandler = () => {
                this.click.bind(this);
                const person = new Person(name.value, surname.value, age.value);
                status.value = `${person.name} ${person.surname} created`;
        };

        btnCreatePerson.addEventListener('click', this.clickHandler);
}
 */

// function disposeCreatePersonHandler() {
//         createCreatePersonHandler = null;
// }

// TODO: Once person is created:
//      - Enabled walk/stop buttons
//      - remove listeners - cannot do this yet as need help with "this" keyword
