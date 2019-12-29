// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// TODO: remove global vraiables
// TODO: on HTML, add <form>. Test "required" functionality

class Helper {
        get firstname() {
                if (this._firstname == null) {
                        this._firstname = document.querySelector('.firstname');
                }
                return this._firstname;
        }

        get surname() {
                if (this._surname == null) {
                        this._surname = document.querySelector('.surname');
                }
                return this._surname;
        }

        get age() {
                if (this._age == null) {
                        this._age = document.querySelector('.age');
                }
                return this._age;
        }

        get status() {
                if (this._status == null) {
                        this._status = document.querySelector('.status');
                }
                return this._status;
        }

        get input() {
                if (this._input == null) {
                        this._input = document.querySelector('.input');
                }
                return this._input;
        }

        get frmCreatePerson() {
                if (this._frmCreatePerson == null) {
                        this._frmCreatePerson = document.querySelector('[name="createPerson"]');
                }
                return this._frmCreatePerson;
        }

        get btnWalk() {
                if (this._btnWalk == null) {
                        this._btnWalk = document.querySelector('.walk');
                }
                return this._btnWalk;
        }

        get btnStop() {
                if (this._btnStop == null) {
                        this._btnStop = document.querySelector('.stop');
                }
                return this._btnStop;
        }

        dispose() {
                this.firstname = null;
                this.surname = null;
                this.age = null;
                this.status = null;
                this.input = null;
                this.frmCreatePerson = null;
                this.btnWalk = null; // dispose
                this.btnStop = null; // dispose
        }

        checkValue(e) {
                this.status.value = e.currentTarget.value;
        }

        addInputListner() {
                this.input.forEach(function(ev) {
                        ev.addEventListener('input', checkValue);
                });
        }
}

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

const helper = new Helper();

// Dummy person
helper.firstname.value = 'Barend';
helper.surname.value = 'Koorzen';

function walkHandler() {
        const clickHandler = () => {
                console.log('clicked here');
        };

        helper.btnWalk.addEventListener('click', clickHandler);
}

function stopHandler() {
        const clickHandler = () => {
                console.log('clicked here');
        };

        helper.btnStop.addEventListener('click', clickHandler);
}

function createPersonHandler() {
        const clickHandler = e => {
                e.preventDefault();
                const person = new Person(helper.firstname.value, helper.surname.value, helper.age.value);
                helper.status.value = `${person.name} ${person.surname} created`;
                helper.frmCreatePerson.setAttribute('disabled', '');
                console.log(helper.frmCreatePerson);
                // TODO: register seperate eventlistener for statements below to seperate concern
                helper.btnStop.removeAttribute('disabled');
                helper.btnWalk.removeAttribute('disabled');
                walkHandler();
                stopHandler();
        };
        helper.frmCreatePerson.addEventListener('submit', clickHandler);
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
