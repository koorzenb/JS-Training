export class ViewModel {
    
    constructor() {
        this.hoverHandler = this.hover.bind(this);
        this._init();
        this.dispose();
    }
    
    _init() {
        this.setIds();
        this.registerListeners();
    }

    setIds() {
        const lists = document.querySelectorAll("li");
        let id = 1;
        for (const li of lists) {
            li.setAttribute("id", id);
            id++;
        }
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
        // element.hasChildNodes() returns true if element does not have children, but do have text
        
        // this.hasChilren(element) ? 
        see toggleExp below. 
        console.log("hasChildren")
        console.log();

        
        // function myFunction() {
            if(element.hasChildNodes() != null && element.parentElement.getAttribute("aria-expanded") != "true" ) {
                element.parentElement.setAttribute("aria-expanded", "true"); 
            }
            var x = element.getAttribute("aria-expanded"); 
            console.log(x);
            element.setAttribute("aria-expanded", "true"); 
          
    }
    
    /**
     * Gets id2 and set expanded to true. Sets exp of old id (id1) to false
     * @param {*} id 
     * @param {*} id2 
     */
    toggleExpanded(id, id2) {
        var n = document.getElementById(id);
        if (n.style.display != 'none') 
            {
            n.style.display = 'none';
            document.getElementById(id2).setAttribute('aria-expanded', 'false');
        }
        else
        {
        n.style.display = '';
        document.getElementById(id2).setAttribute('aria-expanded', 'true');
            }
    }
    
    dispose() {
        //...
    }

    hasChilren(element) {
        return element.querySelectorAll("li") != null ? true : false;
    }

}