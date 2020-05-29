import {ViewModel} from "./viewmodel.js"
let viewmodel = new ViewModel();

window.addEventListener("unload",unloadHandler, { once: true });

function unloadHandler() {
    viewModel.dispose();
}
