class loadComponents {

    constructor(id, target) {
        createElement("template");
        html = getHTML(id); //fetch? ?? if fileNotExist .html, then not templated
        template.innerHTML = html;
        target.appendChild(template);

    }

    dispose() {
        //TODO: unregister components
    }

}