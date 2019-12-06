
export function getInputValue(name,lastName,age){    
    const nVal = document.getElementById("name").value;
    const lnVal = document.getElementById("lastName").value;
    const aVal = document.getElementById("age").value;
    
    const details = nVal + lnVal + aVal;
    return details;
}


