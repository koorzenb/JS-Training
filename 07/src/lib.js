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
                        this._firstname = document.querySelector('#firstname');
                }
                return this._firstname;
        }

        get txtSurname() {
                if (this._surname == null) {
                        this._surname = document.querySelector('#surname');
                }
                return this._surname;
        }

        get txtAge() {
                if (this._age == null) {
                        this._age = document.querySelector('#age');
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
                        this._input = document.querySelectorAll('.input');
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
                this.name = null;
                this.surname = null;
                this.age = null;
        }
}

function program() {
        // TODO: create class from this function and resolve const's
        const dc = new DataCollector();
        const person = new Person();

        /**
         * walkHandler problem:
         * If person created at btnCreatePersonHandler, person obj is destroyed when btnCreatePersonHandler completes and walkHandler cannot access person properties
         * Solution: pass person? But then at what point do we dispose?
         */

        function walkHandler() {
                const clickHandler = () => {
                        person.startWalking();
                        dc.txtStatus.innerHTML = `${person.isWalking}`;
                        dc.txtStatus.removeAttribute('isidle');
                        dc.txtStatus.setAttribute('class', 'iswalking');
                        dc.btnWalk.setAttribute('disabled', '');
                        dc.btnStop.removeAttribute('disabled');
                };

                dc.btnWalk.addEventListener('click', clickHandler);
        }

        function stopHandler() {
                const clickHandler = () => {
                        person.stopWalking();
                        dc.txtStatus.innerHTML = `${person.isWalking}`;
                        dc.txtStatus.removeAttribute('iswalking');
                        dc.txtStatus.setAttribute('class', 'isidle');
                        dc.btnStop.setAttribute('disabled', '');
                        dc.btnWalk.removeAttribute('disabled');
                };

                dc.btnStop.addEventListener('click', clickHandler);
        }

        function btnCreatePersonHandler() {
                const clickHandler = e => {
                        e.preventDefault();
                        // this.click.bind(this);        // this breaks code
                        // TODO: how to use Person constructor. If I use inside this block, obj is destroy once block completes
                        person.name = dc.txtFirstname.value;
                        person.surname = dc.txtSurname.value;
                        person.age = dc.txtAge.value;
                        dc.txtStatus.innerHTML = `${person.name} ${person.surname} (${person.age}) created`;
                        dc.btnCreatePerson.setAttribute('disabled', '');
                        // TODO: Should I register seperate eventlistener for statements below to seperate concern?
                        dc.btnStop.removeAttribute('disabled');
                        dc.btnWalk.removeAttribute('disabled');
                        dc.txtFirstname.setAttribute('disabled', '');
                        dc.txtSurname.setAttribute('disabled', '');
                        dc.txtAge.setAttribute('disabled', '');
                        walkHandler();
                        stopHandler();
                };
                dc.btnCreatePerson.addEventListener('click', clickHandler);
        }

        function dataValidation() {
                function inputsHandle() {
                        if (dc.txtFirstname.value !== '' && dc.txtSurname.value !== '' && dc.txtAge.value !== '') {
                                dc.btnCreatePerson.removeAttribute('disabled');
                        }
                }

                function disableInput() {
                        dc.input.forEach(function(inputs) {
                                inputs.addEventListener('keyup', inputsHandle);
                        });
                }

                disableInput();
        }

        dataValidation();
        btnCreatePersonHandler();
}

console.log('lib.js is working');
program();

/** not working
 * dispose() {
        walkHandler();
        stopHandler();
        btnCreatePersonHandler();
        disableInput();
}
 */
