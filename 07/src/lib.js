// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

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
                this.btnWalk = null;
                this.btnStop = null;
        }
}

class Person {
        get isWalking() {
                return this._isWalking === true
                        ? `\n${this.name} ${this.lastName} is walking`
                        : `\n${this.name} ${this.lastName} is idle`;
        }

        constructor(name, surname, age) {
                this._name = name;
                this._surname = surname;
                this._age = age;
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
const dummyName = helper.firstname.value = 'Joe';
const dummySurname = helper.surname.value = 'Soap';
const dummyAge = helper.age.value = '23';
let person = new Person();

function walkHandler() {
        const clickHandler = () => {
                helper.status.value = `${person._name} ${isWalking}`;
        };

        helper.btnWalk.addEventListener('click', clickHandler);
}

function stopHandler() {
        const clickHandler = () => {
                console.log('working');
        };

        helper.btnStop.addEventListener('click', clickHandler);
}

function createPersonHandler() {
        const clickHandler = e => {
                e.preventDefault();
                //this.click.bind(this);        // this breaks code
                person = Person(dummyName,dummySurname, helper.age.value);
                helper.status.value = `${person._name} ${person._surname} (${person._age}) created`;
                helper.frmCreatePerson.setAttribute('disabled', '');
                console.log(helper.frmCreatePerson);
                // TODO: Should I register seperate eventlistener for statements below to seperate concern?
                helper.btnStop.removeAttribute('disabled');
                helper.btnWalk.removeAttribute('disabled');
                walkHandler();
                stopHandler();
                return true;
        };
        helper.frmCreatePerson.addEventListener('submit', clickHandler);
}

function disposeCreatePersonHandler() {
         createCreatePersonHandler = null;
}

createPersonHandler();

// TODO: Once person is created:
//      - Enabled walk/stop buttons
//      - remove listeners - cannot do this yet as need help with "this" keyword
