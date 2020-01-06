// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// import { DataCollector } from './dataCollector.js';
// TODO: try to get babel working
// Get HTML innertext working

// TODO: Need help with best practice: naming technique +
// structure of code. Current code not working, but trying to figure out how to group code. I can't
// leave everything as functions. How will Person implement Helper functions? Should I create Helper interface?
// Should Person have instance of Helper? Or rahter create hierarchy of classes that inherit from each other

class DataCollector {
        get txtFirstname() {
                if (this._firstname == null) {
                        this._firstname = document.querySelector('#firstname').value;
                }
                return this._firstname;
        }

        get txtSurname() {
                if (this._surname == null) {
                        this._surname = document.querySelector('#surname').value;
                }
                return this._surname;
        }

        get txtAge() {
                if (this._age == null) {
                        this._age = document.querySelector('#age').value;
                }
                return this._age;
        }

        get txtStatus() {
                if (this._status == null) {
                        this._status = document.querySelector('#status');
                }
                return this._status;
        }

        get input() {
                if (this._input == null) {
                        this._input = document.querySelector('#input');
                }
                return this._input;
        }

        get submitCreatePerson() {
                if (this._frmCreatePerson == null) {
                        this._frmCreatePerson = document.querySelector('[name="createPerson"]');
                }
                return this._frmCreatePerson;
        }

        get btnCreatePerson() {
                if (this._btnCreatePerson == null) {
                        this._btnCreatePerson = document.querySelector('#createPerson');
                }
                return this._btnCreatePerson;
        }

        get btnWalk() {
                if (this._btnWalk == null) {
                        this._btnWalk = document.querySelector('#walk');
                }
                return this._btnWalk;
        }

        get btnStop() {
                if (this._btnStop == null) {
                        this._btnStop = document.querySelector('#stop');
                }
                return this._btnStop;
        }

        dispose() {
                this.txtFirstname = null;
                this.txtSurname = null;
                this.txtAge = null;
                this.status = null;
                this.input = null;
                this.submitCreatePerson = null;
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
        // TODO: what do I reference to dispose constructor?

        set name(newValue) {
                this._name = newValue;
        }

        set surname(newValue) {
                this._surname = newValue;
        }

        set age(newValue) {
                this._age = newValue;
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

        dispose() {
                name = null;
                surname = null;
                age = null;
        }
}

const helper = new DataCollector();
const person = new Person();

/**
 * walkHandler problem:
 * If person created at btnCreatePersonHandler, person obj is destroyed when btnCreatePersonHandler completes and walkHandler cannot access person properties
 * Solution: pass person? But then at what point do we dispose?
 */

function walkHandler() {
        const clickHandler = () => {
                person.startWalking();
                helper.txtStatus.innerHTML = `${person.isWalking}`;
                helper.txtStatus.removeAttribute('isidle');
                helper.txtStatus.setAttribute('class', 'iswalking');
                helper.btnWalk.setAttribute('disabled', '');
                helper.btnStop.removeAttribute('disabled');
        };

        helper.btnWalk.addEventListener('click', clickHandler);
}

function stopHandler() {
        const clickHandler = () => {
                person.stopWalking();
                helper.txtStatus.innerHTML = `${person.isWalking}`;
                helper.txtStatus.removeAttribute('iswalking');
                helper.txtStatus.setAttribute('class', 'isidle');
                helper.btnStop.setAttribute('disabled', '');
                helper.btnWalk.removeAttribute('disabled');
        };

        helper.btnStop.addEventListener('click', clickHandler);
}

/**
 * Problem:
 * I need to create person form values in textfield once button click. Can do that, but then person obj destroyed
 * once handler closes and btnWalk needs acccess to person properties
 * ... or is there a way that I can create empty obj outside click handler, but only fill it later with values?
 */
function btnCreatePersonHandler() {
        const clickHandler = e => {
                e.preventDefault();
                // this.click.bind(this);        // this breaks code
                // TODO: how to use Person constructor. If I use inside this block, obj is destroy once block completes
                person.name = helper.txtFirstname;
                person.surname = helper.txtSurname;
                person.age = helper.txtAge;
                helper.txtStatus.innerHTML = `${person.name} ${person.surname} (${person.age}) created`;
                helper.btnCreatePerson.setAttribute('disabled', '');
                // TODO: Should I register seperate eventlistener for statements below to seperate concern?
                helper.btnStop.removeAttribute('disabled');
                helper.btnWalk.removeAttribute('disabled');
                walkHandler();
                stopHandler();
        };
        helper.btnCreatePerson.addEventListener('click', clickHandler);
}

btnCreatePersonHandler();
console.log('working');
dispose(){
        walkHandler();
        stopHandler();
        btnCreatePersonHandler();
}