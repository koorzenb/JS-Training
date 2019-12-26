// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// TODO: remove global vraiables

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

const name = document.querySelector('.name');
const surname = document.querySelector('.surname');
const age = document.querySelector('.age');
const status = document.querySelector('.status');
const input = document.querySelectorAll('input');
const btnCreatePerson = document.querySelector('.createPerson');

// Dummy person
name.value = 'Barend';
surname.value = 'Koorzen';

// wait on 3x textfields to contain data
// enable CreatePerson button
function waitOnData() {
        if (surname.value !== '' && name.value !== '' && age.value !== '') {
                return true;
        }
        return false;
}

// listen on 3x textfields
function listenOnInputs(e) {
        status.value = e.currentTarget.value;
        if (waitOnData()) {
                btnCreatePerson.removeAttribute('disabled');
        }
}

input.forEach(function(e) {
        e.addEventListener('input', listenOnInputs);
});

const handle = event => {
        const person = new Person(name.value, surname.value, age.value);
        status.value = `${person.name} ${person.surname} created`;
};

btnCreatePerson.addEventListener('click', handle);

// TODO: Once person is created:
//      - Enabled walk/stop buttons
//      - remove listeners
