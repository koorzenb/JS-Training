// https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: remove disabled attribute once all fields have been populated

const name = document.querySelector('.name');

const handle = () => {
        console.log('clicked here');
        console.log(name.value);
}

name.addEventListener('click',handle);





