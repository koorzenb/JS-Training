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

class DataControl {

    connectedCallback() {
        this.updateHandler = this.update.bind(this);
        window.eventEmitter.on("data-changed", this.updateHandler);
        this.data = new Datasource();
    }

    disconnectedCallback() {

    }

    onChangedAttrib() {

    }

    update(record) {
        this.data.set(record.id, record.value);
    }
}