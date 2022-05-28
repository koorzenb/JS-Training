import Binding from "./binding.js";
export default class ViewModel {

    constructor() {
        console.log("viewModel started");
        this._init();
        const binding = new Binding(this.element);
        binding.setBindingExpressions();
    }

    dispose() {
        delete this.element;
    }

    /**
     * Basic initialization of viewModel
     */
    _init() {
        this.element = document.querySelector("div");
    }
}