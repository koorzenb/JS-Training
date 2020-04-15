function _fileValidation(response) {
    response => {
        if(!response.ok){
            alert(`File not found:\n ${response.url}`);
        } 
    }
}

// fetch(file) = Promise pending with resolve = response
// assigning to const b = undefined because resolve is handled by promise