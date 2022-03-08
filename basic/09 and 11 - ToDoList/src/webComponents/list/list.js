import {getHTML, cloneNode} from "../../utils/system-utils.js";

class List extends HTMLElement {

    get data() {
        return this._data;
    }

    get data() {
        return this._data;
    }

    async connectedCallback() {
        const clone = cloneNode("list");
        const fragment = new DocumentFragment;
        for (const entry of Object.keys(this.data)) {
            const listItem = document.createElement("list-item");
            listItem.description = description;
            listItem.date = formattedDate();
            fragment.appendChild(listItem);
        }
        clone.appendChild(fragment);
        this.appendChild(clone);
    }

    disconnectedCallback() {

    }


}

customElements.define("custom-list", List);
