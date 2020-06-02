import {ViewModel} from "./viewmodel.js"
let viewmodel = new ViewModel();

window.addEventListener("unload",unloadHandler, { once: true });

function unloadHandler() {
    viewModel.dispose();
}

never empty string check!
add main + li
move to middle
adjacent to template
trim()/
svg to button  	
move descrip to utils
get focus on button
must have aria next time
check again around 54min + 1.07