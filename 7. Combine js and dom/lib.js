// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
// TODO: Test class implementation - leave till later. Need help with best practice: naming technique + 
// structure of code. Current code not working, but trying to figure out how to group code. I can't 
// leave everything as functions. I should rather implement Helper interface? 
// Or have hierarchy of classes that inherit from each other

class Helper {

        constructor(){

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
}


class Program extends Helper, 
 {
        // Dummy person
        model.firstname.value = 'Barend';
        model.surname.value = 'Koorzen';

        function walkHandler() {
                const clickHandler = () => {
                        console.log('clicked here');
                };

                model.btnWalk.addEventListener('click', clickHandler);
        }

        function stopHandler() {
                const clickHandler = () => {
                        console.log('clicked here');
                };

                model.btnStop.addEventListener('click', clickHandler);
        }

        function createPersonHandler() {
                const clickHandler = e => {
                        e.preventDefault();
                        const person = new Person(model.firstname.value, model.surname.value, model.age.value);
                        model.status.value = `${person.name} ${person.surname} created`;
                        model.frmCreatePerson.setAttribute('disabled', '');
                        console.log(model.frmCreatePerson);
                        // TODO: register seperate eventlistener for statements below to seperate concern
                        model.btnStop.removeAttribute('disabled');
                        model.btnWalk.removeAttribute('disabled');
                        walkHandler();
                        stopHandler();
                };
                model.frmCreatePerson.addEventListener('submit', clickHandler);
        }

        createPersonHandler();
}
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
