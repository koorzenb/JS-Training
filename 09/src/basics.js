// https://github.com/caperaven/training/blob/master/09.Batch%20dom%20updates%20-%20project.md

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
const items = [];

function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted!!');
    const name = e.currentTarget.item.value;
    
    const item = {
        name,
        id : Date.now(),
        complete: false
    }

    items.push(item);
    console.log(`There are now ${items.length} items in your state`);
    
    
    // if its empty, then dont submit it
    if (!name) return;
}

shoppingForm.addEventListener('submit',handleSubmit);