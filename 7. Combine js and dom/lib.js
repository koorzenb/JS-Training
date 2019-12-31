// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: Need help with best practice: naming technique +
// structure of code. Current code not working, but trying to figure out how to group code. I can't
// leave everything as functions. How will Person implement Helper functions? Should I create Helper interface?
// Should Person have instance of Helper? Or rahter create hierarchy of classes that inherit from each other

// TODO: Person class: what is difference in scope between name and _name? I would think that name is only passed 
//      as parameter, but it still returns a value if I console.log "person.name". With both variable, how do 
//      I make sure that scope does not extend block and that I accidentally overwrite values.

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
const dummyName = helper.firstname.value = 'Barend';
const dummySurname = helper.surname.value = 'Koorzen';


function walkHandler() {
        const clickHandler = () => {
                console.log('working');
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
                const person = new Person(dummyName,dummySurname, helper.age.value);
                //helper.status.value = `${person.name} ${person.surname} created`;
                helper.status.value = `${person._name} ${person._surname} (${person._age}) created`;
                helper.frmCreatePerson.setAttribute('disabled', '');
                console.log(helper.frmCreatePerson);
                // TODO: register seperate eventlistener for statements below to seperate concern. 
                helper.btnStop.removeAttribute('disabled');
                helper.btnWalk.removeAttribute('disabled');
                walkHandler();
                stopHandler();
        };
        helper.frmCreatePerson.addEventListener('submit', clickHandler);
}

createPersonHandler();