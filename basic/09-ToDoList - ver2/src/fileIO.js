export class FileIO {

    get currentStorage() {
        try {
            this._currentStorage = localStorage.getItem("todoListData");
        } catch (error) {
            this._currentStorage = {};
        }

        if (Object.keys(this._currentStorage).length != 0) {
            JSON.parse(this._currentStorage)
        } else { 
            this.currentStorage = {};
        }

        return this._currentStorage;
    }

    set currentStorage(newValue) {
        this._currentStorage = newValue;
        localStorage.setItem("todoListData", newValue);
    }

    saveToLocalStorage(newHours) {
        this.currentStorage = JSON.stringify(newHours);
    }

    loadFromLocalStorage() {
        return this.currentStorage
    }

}
