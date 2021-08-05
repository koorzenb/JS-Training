import {Person} from "person.js"
class ViewModel {
    
    get myproperty(instance) {
        return this._[`${instance}`];
    }
    
    set myproperty (newValue) {
        this._[`${newValue}`] = new Person()
    }

    create(newInstance) {
        this.myproperty(newInstance)
    }
}

const vm = new ViewModel();
vm.create;