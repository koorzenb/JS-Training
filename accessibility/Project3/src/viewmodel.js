export class ViewModel {
    
    constructor() {
        this.hoverHandler = this.hover.bind(this);
        this.registerListeners();
        this.dispose();
    }

    registerListeners() {
        const lists = document.querySelectorAll("li")
        for (const li of lists) {
            li.addEventListener("hover", this.hoverHandler())
        }
    }

    hover(e) {

        console.log(e);
    }
    
    setExpanded(e) {
    }
    
    dispose() {
        //...
    }

}