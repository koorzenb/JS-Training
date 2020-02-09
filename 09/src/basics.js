// https://github.com/caperaven/training/blob/master/09.Batch%20dom%20updates%20-%20project.md

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
const items = [];

function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted!!');
    const name = e.currentTarget.item.value;
    if (!name) return;

    const item = {
        name,
        id: Date.now(),
        complete: false,
    };

    items.push(item);
    console.log(`There are now ${items.length} items in your state`);
    e.target.reset();
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    console.log(items);
    const html = items
        .map(
            item =>
                `<li class='shopping-item'>
            <input type="checkbox">
            <span class="itemName">${item.name}</span>
            <button aria-label="Remove ${item.name}">&times;</button>
        </li>`
        )
        .join('');
    list.innerHTML = html;
}

function mirrorLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
    console.info('Saving to storage');
}

function restoreFromLocalStorage() {
    console.info(`Restoring from storage`);
    const lsItems = JSON.parse(localStorage.getItem(items));
    if (items.length) {
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deletedItem() {
    console.log('Deleting item');
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorLocalStorage);
list.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        deletedItem();
    }
});

restoreFromLocalStorage();
