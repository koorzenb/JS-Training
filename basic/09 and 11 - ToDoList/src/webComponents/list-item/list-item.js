// - script
//     - onChangedAttrib dataset.value
//         - update UI
//             - this/descriptions.textContent = dataset.value 

//     addNewItem() {
//         - update datasource.data
//         - emit("changed")
//     }


// lite version:
// - listElememnt = createElement(list-item)
// - listElement.description = descriptiobn
// - on ConnectedCallback = get description() and populate


class ListItem {

    get description() {
        return this.description;
    }

    get date() {
        return this.date;
    }

    connectedCallback() {
        const template = 
    }

    disconnectedCallback() {

    }


}

customElements.define("list-item", ListItem);
