import {registerEvent, unregisterEvents} from "./utils/system-utils.js";
import Binding from "./binding.js";
export default class ViewModel {

    constructor() {
        console.log("viewModel started");
        this._init();
        const binding = new Binding(this.element);
        binding.setBindingExpressions(this.element);
    }

    dispose() {
        delete this.element;
    }

    _init() {
        this.element = document.querySelector("div");
    }
}