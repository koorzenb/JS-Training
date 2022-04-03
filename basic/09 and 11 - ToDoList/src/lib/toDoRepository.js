import {create} from "browser-sync";

class TodoRepository {
    /**
     * Action after "+"
     */
    create() {
        // loadComponent("list-item", "ul")
        // data.records.set(++id, inputvalue)
        // emit("changed")

        /**
         * v2
         * 
         * if no file, create data/entries.json with array as content
         */
    }

    /**
     * Action after "enter"
     */
    update() {
        // - get input 
        // - on keydown/enter
        // <!-- - data.records = new Map() -->
        // - data.records.get()
        // - data.records.set(checkbox.id, inputValue) 
        // - emit "changed"

        /**
         * v2
         * readAll - if  no  array, create empty array adn append first item
         * if existing array, createRecord and push item 
         */
    }

    readById() {
        // readAll and filter by Id
    }

    getLastRecord() {
        // readlAll and return as this.lastRecordId
    }

    readAll() {
        // this.data = fetch all data in file
    }

    deleteById(id) {

    }

    createRecord() {
        // inflate and return record with id, description and date
        // what is value of last id in array? Or use getLastRecord and then this.lastRecord++ for future use
    }

}