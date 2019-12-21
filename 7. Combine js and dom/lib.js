//Project 7:
//https://github.com/caperaven/training/blob/master/07.Combine%20javascript%20and%20dom%20project.md

// TODO: remove disabled attribute once all fields have been populated

get name(){
        if (this._name == null){
                this._name = document.querySelector('.name');
        }
        return this._name;
}

get surname(){
        if (this._surname == null){
                this._surname = document.querySelector('.surname');                
        }document.querySelector('.surname');        
}

get age(){
        if(this._age ==  null){
                this._age = document.querySelector('.age');
        }
        return this._age;
}

get status(){
        if(this._status ==  null){
                this._status = document.querySelector('.status');
        }
        return this._status;
}

get input(){
        if(this._input == null){
                this._input = document.querySelector('.input');
        }
        return this._input;
}

dispose(){
        name = null;
        surname = null;
        age = null;
}

function checkValue(e) {
        status.value = e.currentTarget.value;
}

input.forEach(function(ev) {
        ev.addEventListener('input', checkValue);
});

/*
const handle = (event) => {
        console.log('clicked here');
        status.value += event.currentTarget.value;
        
}

name.addEventListener('keyup',handle);
lastName.addEventListener('keyup',handle);
window.addEventListener('click', handle );


const attachListener = (event) => {
        status.value = event.currentTarget.value;
        console.log(surname.value);        
}
inputs.forEach(function(textfield) {
        //textfield.addEventListener('keyup',attachListener);
        console.log(textfield.value);          
});

function validateInputs() {
        
}
*/
