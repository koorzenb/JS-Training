import {getHTML, formattedDate, cloneNode} from "../../utils/system-utils.js";

class customList extends HTMLElement {

    get data() {
        return this._data;
    }

    set data(newValue) {
        this._data = newValue;
    }

    async connectedCallback() {
        const clone = cloneNode("customList");
        const fragment = new DocumentFragment;
        for (const entry of Object.values(this.data)) {
            const listItem = document.createElement("list-item");
            listItem.description = entry.description;
            listItem.date = formattedDate();
            fragment.appendChild(listItem);
        }
        clone.appendChild(fragment);
        this.appendChild(clone);
    }

    disconnectedCallback() {

    }


}

customElements.define("custom-list", customList);
