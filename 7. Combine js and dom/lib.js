// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: remove disabled attribute once all fields have been populated
// TODO: remove global vraiables

const name = document.querySelector('.name');
const lastName = document.querySelector('.lastName');
const age = document.querySelector('.age');
const status = document.querySelector('.status');
const input = document.querySelectorAll('input');

function checkValue(e) {
        status.value = e.currentTarget.value;
}

input.forEach(function(ev) {
        ev.addEventListener('input', checkValue);
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
