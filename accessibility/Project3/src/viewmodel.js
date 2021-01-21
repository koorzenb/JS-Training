export class ViewModel {
    
    constructor() {
        this.hoverHandler = this.hover.bind(this);
        this.registerListeners();
        this.dispose();
    }

    registerListeners() {
        const lists = document.querySelectorAll("li")
        for (const li of lists) {
            li.addEventListener("mouseover", this.hoverHandler);
        }
    }

    hover(e) {
        console.log(e.currentTarget);
        const element = e.currentTarget;
        
        // function myFunction() {
            if(element.parentElement != null && element.parentElement.getAttribute("aria-expanded") != "true" ) {
                element.parentElement.setAttribute("aria-expanded", "true"); 
            }
            var x = element.getAttribute("aria-expanded"); 
            console.log(x);
            element.setAttribute("aria-expanded", "true"); 
            // if (x == "true") 
            // {
            // x = "false"
            // } else {
            // x = "true"
            // }
            // document.getElementById("p2").setAttribute("aria-expanded", x);
            // }
    }
    
    setExpanded(e) {
    }
    
    dispose() {
        //...
    }

}