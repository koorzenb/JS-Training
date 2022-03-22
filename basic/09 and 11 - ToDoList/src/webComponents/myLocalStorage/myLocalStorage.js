class MyLocalStorage extends HTMLElement {

    async connectedCallback() {
        const response = await fetch(this.dataset.url);
        const data = await response.text();
        // const customList = document.createElement("custom-list");
        const target = document.querySelector(this.dataset.target);
        // customList.data = JSON.parse(data);
        target.data = JSON.parse(data); // send data and move on
        window.eventEmitter.emit("updated-data");
    }

    //save ()
    // get data of target element
    // JSON.stringify
    // save/ovrwrite to storage with title 

    //read ()

}

customElements.define("my-local-storage", DataControl);

