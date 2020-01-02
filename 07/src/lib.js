// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// import { DataCollector } from './dataCollector.js';

class DataCollector {
        // placeholder person
        constructor() {
                // would "this" be necessary?  this.document.querySelector('.firstname').value = 'Joe';
                document.querySelector('.firstname').value = 'Joe';
                document.querySelector('.surname').value = 'Soap';
                document.querySelector('.age').value = '23';
        }

        get firstname() {
                if (this._firstname == null) {
                        this._firstname = document.querySelector('.firstname').value;
                }
                return this._firstname;
        }

        get surname() {
                if (this._surname == null) {
                        this._surname = document.querySelector('.surname').value;
                }
                return this._surname;
        }

        get age() {
                if (this._age == null) {
                        this._age = document.querySelector('.age').value;
                }
                return this._age;
        }

        // set status(newValue){
        //         this._statusValue = newValue;
        // }

        get statusElement() {
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

        get name() {
                return this._name;
        }

        get surname() {
                return this._surname;
        }

        get age() {
                return this._age;
        }

        startWalking() {
                this._isWalking = true;
        }

        stopWalking() {
                this._isWalking = false;
        }
}

const helper = new DataCollector();
const person = new Person(helper.firstname, helper.surname, helper.age);

function walkHandler() {
        const clickHandler = () => {
                helper.statusElement.innerHTML = `${person.name} ${person.isWalking}`;
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
                // this.click.bind(this);        // this breaks code
                // helper.statusElement.value = `${person.name} ${person.surname} (${person.age}) created`;
                document.querySelector('.status').innerHTML = document.querySelector('.firstname').textContent;
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

// function disposeCreatePersonHandler() {
//         createCreatePersonHandler = null;
// }

createPersonHandler();

// TODO: Once person is created:
//      - Enabled walk/stop buttons
//      - remove listeners - cannot do this yet as need help with "this" keyword
