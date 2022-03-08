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

    get target() {
        return this.dataset.target;
    }

    async connectedCallback() {
        //const data = fetch(dataset.url)
        console.log("data-control started");
        const response = await fetch(this.dataset.url);
        const data = await response.text();
        const entries = JSON.parse(data);
        for (const d of entries) {

            console.log(d + "entryies");
        }

        // list.data = data
        // forof data {
        //      list.appendchild(list-item)
        // }

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