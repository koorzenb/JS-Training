// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// import { DataCollector } from './dataCollector.js';
// TODO: try to get babel working
// Get HTML innertext working

// TODO: Need help with best practice: naming technique +
// structure of code. Current code not working, but trying to figure out how to group code. I can't
// leave everything as functions. How will Person implement Helper functions? Should I create Helper interface?
// Should Person have instance of Helper? Or rahter create hierarchy of classes that inherit from each other

class DataCollector {
        // placeholder person
        constructor() {
                // would "this" be necessary?  this.document.querySelector('.firstname').value = 'Joe';
                document.getElementById('firstname').value = 'Joe';
                document.getElementById('surname').value = 'Soap';
                document.getElementById('age').value = '23';
        }

        get firstname() {
                if (this._firstname == null) {
                        this._firstname = document.getElementById("firstname").value;
                }
                return this._firstname;
        }

        get surname() {
                if (this._surname == null) {
                        this._surname = document.getElementById('surname').value;
                }
                return this._surname;
        }

        get age() {
                if (this._age == null) {
                        this._age = document.getElementById('age').value;
                }
                return this._age;
        }

        get statusElement() {
                if (this._status == null) {
                        this._status = document.getElementById('status');
                }
                return this._status;
        }

        get input() {
                if (this._input == null) {
                        this._input = document.getElementById('input');
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
                        this._btnWalk = document.getElementById('walk');
                }
                return this._btnWalk;
        }

        get btnStop() {
                if (this._btnStop == null) {
                        this._btnStop = document.getElementById('stop');
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
                        ? `${this.name} ${this.surname} is walking`
                        : `${this.name} ${this.surname} is idle`;
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
                person.startWalking();
                helper.statusElement.innerHTML = `${person.isWalking}`;
                helper.statusElement.removeAttribute('isidle');
                helper.statusElement.setAttribute('class', 'iswalking');
        };
        
        helper.btnWalk.addEventListener('click', clickHandler);
}

function stopHandler() {
        const clickHandler = () => {
                person.stopWalking();
                helper.statusElement.innerHTML = `${person.isWalking}`;
                helper.statusElement.removeAttribute('iswalking');
                helper.statusElement.setAttribute('class', 'isidle');
        };

        helper.btnStop.addEventListener('click', clickHandler);
}

function createPersonHandler() {
        const clickHandler = e => {
                e.preventDefault();
                // this.click.bind(this);        // this breaks code
                helper.statusElement.innerHTML = `${person.name} ${person.surname} (${person.age}) created`;
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

createPersonHandler();
