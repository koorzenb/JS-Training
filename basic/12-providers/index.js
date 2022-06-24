import ViewModel from "./src/viewModel.js";
const viewModel = new ViewModel();

//separate parser so that it walks DOM and in case of binding expressions, then hand them over to Binding
// set context on ViewModel -> VM to give Binding context data