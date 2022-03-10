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

}

customElements.define("data-control", DataControl);



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


    // update(record) {
    //     this.data.set(record.id, record.value);
    // }
