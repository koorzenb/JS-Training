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

        get txtFirstname() {
                if (this._firstname == null) {
                        this._firstname = document.getElementById("firstname").value;
                }
                return this._firstname;
        }

        get txtSurname() {
                if (this._surname == null) {
                        this._surname = document.getElementById('surname').value;
                }
                return this._surname;
        }

        get txtAge() {
                if (this._age == null) {
                        this._age = document.getElementById('age').value;
                }
                return this._age;
        }

        get txtStatus() {
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

        get submitCreatePerson() {
                if (this._frmCreatePerson == null) {
                        this._frmCreatePerson = document.querySelector('[name="createPerson"]');
                }
                return this._frmCreatePerson;
        }

        get btnCreatePerson() {
                if (this._btnCreatePerson == null) {
                        this._btnCreatePerson = document.getElementById('createPerson');
                }
                return this._btnCreatePerson;
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



/**
 * TODO:
 * grab value from input boxes and create person
 * grab = qs
 * create = person.firstname
 */

class Program{
        import { helper } from "DataCollector";
        const helper = new DataCollector();
const person = new Person(helper.txtFirstname, helper.txtSurname, helper.txtAge);
        walkHandler() {
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
        
        stopHandler() {
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
        
        // Handler to submit inputs on form
        // function frmCreatePersonHandler() {
        //         const clickHandler = e => {
        //                 // e.preventDefault();
        //         };
        //         helper.submitCreatePerson.addEventListener('submit', clickHandler);
        // }
        
        btnCreatePersonHandler() {
                const clickHandler = () => {
                        // this.click.bind(this);        // this breaks code
        
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
        
        //frmCreatePersonHandler();
        btnCreatePersonHandler();
}

const program = new Program();
