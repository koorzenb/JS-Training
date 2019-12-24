// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md
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
        if (surname.value !== '' && name.value !== '' && age.value !== '') {
                return true;
        }
        return false;
}

// listen on 3x textfields
function listenOnInputs(e) {
        status.value = e.currentTarget.value;
        if (waitOnData()) {
                btnCreatePerson.removeAttribute('disabled');
        }
}

input.forEach(function(e) {
        e.addEventListener('input', listenOnInputs);
});

// TODO: Once person is created:
//      - Enabled walk/stop buttons
//      - remove listeners
