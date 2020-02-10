// https://github.com/caperaven/training/blob/master/09.Batch%20dom%20updates%20-%20project.md

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
let items = [];

function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return;

    const item = {
        name,
        id: Date.now(),
        complete: false,
    };

    items.push(item);
    e.target.reset();
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const html = items
        .map(
            item =>
                `<li class='shopping-item'>
            <input 
                type="checkbox" 
                value="${item.id}"
                ${item.complete ? 'checked' : ''}
            >
            <span class="itemName">${item.name}</span>
            <button 
                aria-label="Remove ${item.name}"
                value="${item.id}"
            >&times;</button>
        </li>`
        )
        .join('');
    list.innerHTML = html;
}

function mirrorLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    console.info(`Restoring from local storage`);
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length) {
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function markAsComplete(id) {
    const itemRef = items.find(index => index.id === id);

    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deletedItem(id) {
    const newItems = items.filter(index => index.id !== id);
    items = newItems;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorLocalStorage);
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);

    if (e.target.matches('button')) {
        deletedItem(parseInt(id));
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
});

restoreFromLocalStorage();
