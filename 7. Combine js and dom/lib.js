// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: remove disabled attribute once all fields have been populated
// TODO: remove global vraiables

const status = document.querySelector('.status');
const inputs = document.querySelectorAll('.inputs');

const attachListener = (event) => {
        status.value = event.currentTarget.value;       
}
inputs.forEach(function(textfield) {
        textfield.addEventListener('keyup',attachListener);         
});