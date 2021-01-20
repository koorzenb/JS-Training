function registerListeners() {
    const lists = document.querySelectorAll()
    for (const li of lists) {
        li.addEventListener("hover", setExpanded())
    }
}

function setExpanded() {
    
}