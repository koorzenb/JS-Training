class MyLocalStorage extends HTMLElement {

    get title() {
        return this._title ?? "default";
    }

    set title(newValue) {
        this._title = newValue;
    }

    async connectedCallback() {
        if (this.dataset.url == null) console.error("No data location specified for myLocalStorage component");
        const title = this.getAttribute("title");
        title == null ? console.warn("No title set for localStorage") : this.title = title;
        // window.eventEmitter.emit("updated-data");
    }

    async disconnectedCallback() {
        this.dispose();
    }

    dispose() {
        this.title = null;
    }

    async save() {
        localStorage.setItem(this.title, await this.getData(this.dataset.url));
        console.log("saved");
    }

    read() {
        return localStorage.getItem(this.title);
    }

    async getData() {
        const response = await fetch(this.dataset.url);
        return await response.text();
    }

}

customElements.define("my-local-storage", MyLocalStorage);

