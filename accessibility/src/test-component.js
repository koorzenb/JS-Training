/**
 * This is a example of a simple web component.
 * You can add all kinds of bells too this like mutation observers, but just keeping it simple here.
 * Note the following ES6 features
 * 1. Classes
 * 2. Async methods
 * 3. Arrow functions
 *
 * It also uses standard dom features such as first reading from the the DOM and writing in batches.
 */
export class TestComponent extends HTMLElement {
    /**
     * Standard lifecycle event when component is added to dom
     */
    async connectedCallback() {
        // use convention over code to load the HTML file seperating logic from ui.
        // the convention here is that the two files share the same name but have different extensions.
        // as far as possible keep your js, html and css seperate loading each as and when you need it.
        this.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());

        // read all the required elements from dom and cache is to private fields
        this._header = this.querySelector("h1");
        this._content = this.querySelector(".content");
        this._button = this.querySelector("button");

        // update dom as required
        this._header.innerText = this.getAttribute("title") || "No title defined";

        // register events
        // Note that the event handler uses the same name as the function it is going to call with the world Handler added.
        // Understand what .bind does
        this._doSomethingHandler = this._doSomething.bind(this);
        this._button.addEventListener("click", this._doSomethingHandler);
    }

    /**
     * Standard lifecycle event when component is removed from DOM
     * NB: when you instanciate memory and pointers you need to free them
     * Events that you registered, must be unregistered again
     */
    async disconnectedCallback() {
        // unregister events
        this._button.removeEventListener("click", this._doSomethingHandler);

        // free up pointers
        this._button = null;
        this._header = null;
        this._content = null;
        this._doSomethingHandler = null;
    }

    /**
     * This function is private and we use the convention of using a underscore before the name to indicate that.
     * Note that you can't do that with the above life cycle functions as these are system required names as part of the
     * webcomponent standard
     * @private
     */
    _doSomething() {
        this._content.innerText = "You clicked the button";
    }
}

customElements.define("test-component", TestComponent);
