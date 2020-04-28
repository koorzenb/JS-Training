import { ViewModel } from "./viewmodel.js";
const viewModel = new ViewModel();

window.addEventListener("unload",unloadHandler);

function unloadHandler() {
    viewModel.dispose();
}
