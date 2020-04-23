function createCellElement(value, className) {
    const myDiv = document.createElement("div");
    if (className != null) {
        myDiv.classList.add(className, "");
    }
    myDiv.innerText = value;
    console.log(myDiv);
    
}

createCellElement("barend", done);
console.log();
