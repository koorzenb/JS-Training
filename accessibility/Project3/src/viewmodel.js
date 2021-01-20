export class ViewModel {
    
    constructor() {
        this.hoverHandler = this.hover.bind(this);
        this.registerListeners();
        this.dispose();
    }

    registerListeners() {
        const lists = document.querySelectorAll("li")
        for (const li of lists) {
            figure out how to select only parent elements
            console.log(li);
            debugger;
            li.addEventListener("mouseover", this.hoverHandler);
        }
    }

    hover(e) {
        debugger;
        console.log(e.target);
    }
    
    setExpanded(e) {
    }
    
    dispose() {
        //...
    }

}