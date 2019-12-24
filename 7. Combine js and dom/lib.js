/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: remove disabled attribute once all fields have been populated
// TODO: remove global vraiables

const name = document.querySelector('.name');
const surname = document.querySelector('.surname');
const age = document.querySelector('.age');
const status = document.querySelector('.status');
const input = document.querySelectorAll('input');
const btnCreatePerson = document.querySelector('.createPerson');

// wait on 3x textfields to contain data
// enable CreatePerson button
function waitOnData() {
        if ((surname.value !== "")&&(name.value !== "")&&(age.value !== "")) {
                return true;
        }
        return false;
}

// listen on 3x textfields
function listenOnInputs(e) {
        status.value = e.currentTarget.value;
        if (waitOnData() === true) {
                console.log('true');
                btnCreatePerson.removeAttribute("disabled");
        } else {
                console.log('false');
        }
}

input.forEach(function(ev) {
        ev.addEventListener('input', listenOnInputs);
});

/*
const handle = (event) => {
        console.log('clicked here');
        status.value += event.currentTarget.value;
        
}

name.addEventListener('keyup',handle);
lastName.addEventListener('keyup',handle);
window.addEventListener('click', handle );


const attachListener = (event) => {
        status.value = event.currentTarget.value;
        console.log(surname.value);        
}
inputs.forEach(function(textfield) {
        //textfield.addEventListener('keyup',attachListener);
        console.log(textfield.value);          
});

function validateInputs() {
        
}
*/
