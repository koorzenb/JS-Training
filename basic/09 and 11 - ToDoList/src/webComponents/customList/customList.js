import {getHTML, formattedDate, cloneNode} from "../../utils/system-utils.js";

class customList extends HTMLElement {

    get data() {
        return this._data;
    }

    set data(newValue) {
        this._data = newValue;
    }

    async connectedCallback() {
        const clone = await cloneNode("customList");
        const fragment = new DocumentFragment;
        for (const entry of Object.values(this.data)) {
            const listItem = document.createElement("list-item");
            listItem.description = entry.description;
            listItem.date = entry.date; //formattedDate();
            fragment.appendChild(listItem);
        }
        clone.appendChild(fragment);
        this.appendChild(clone);
    }

    disconnectedCallback() {
        this.data = null;
    }


}

customElements.define("custom-list", customList);
