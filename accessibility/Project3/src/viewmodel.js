export class ViewModel {
    
    constructor() {
        this.hoverHandler = this.hover.bind(this);
        this._init();
        this.dispose();
    }
    
    _init() {
        // this.setIds();
        this.registerListeners();
    }

    // setIds() {
    //     const lists = document.querySelectorAll("li");
    //     let id = 1;
    //     for (const li of lists) {
    //         li.setAttribute("id", id);
    //         id++;
    //     }
    // }

    registerListeners() {
        const lists = document.querySelectorAll("li")
        for (const li of lists) {
            this.hasChilren(li) && li.addEventListener("mouseover", this.hoverHandler);
            // no memory management done, since we are not navigating away from page
        }
    }

    hover(e) {
        console.log(e.currentTarget);
        console.log(e.currentTarget.innerText);
        const element = e.currentTarget;
        this.hasChilren(element) && this.toggleExpanded(element);          
    }
    
    /**
     * Gets id2 and set expanded to true. Sets exp of old id (id1) to false
     * @param {*} id - id of element to set aria-expanded on 
     */
    toggleExpanded(element) {
        debugger;
        this.previousElement != null && this.previousElement.setAttribute("aria-expanded","false");
        element.setAttribute("aria-expanded","true");
        this.isParent(element)
        this.previousElement = element;
    }
    
    dispose() {
        // not done since we are not navigating away from this page
    }

    hasChilren(element) {
        return element.querySelectorAll("li").length != 0 ? true : false;
    }

    isParent(element) {
        /**
         * query all li's on this parent-elmenet
         * if any match previousElement, then this is parent
         */

    }

}