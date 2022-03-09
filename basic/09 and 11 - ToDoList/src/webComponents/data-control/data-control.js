// data-control
// on "changed"
// update UI
// get datasource.data lists
// for each record, get value and recordToUpdate.push(currentValue)
// {
//    id: 1,
//    recordValue (or just "value"): "get cucumber"
// }
// for each recordToUpdate
// item = qs(id)
// item.dataset.value = recordValue


class DataControl extends HTMLElement {

    async connectedCallback() {
        console.log("data-control started");
        const response = await fetch(this.dataset.url);
        const data = await response.text();
        const customList = document.createElement("custom-list");
        customList.data = JSON.parse(data);
        const target = document.querySelector(this.dataset.target);
        target.appendChild(customList);
    }

    disconnectedCallback() {

    }

    onChangedAttrib() {

    }

    // update(record) {
    //     this.data.set(record.id, record.value);
    // }
}

customElements.define("data-control", DataControl);