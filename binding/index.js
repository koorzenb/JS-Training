import {ViewBase} from "./node_modules/crs-binding/crs-view-base.js";

export default class IndexViewModel extends ViewBase {
    async connectedCallback() {
        this.title = "My Application";
        await super.connectedCallback();
        crsbinding.data.updateUI(this, "routes");
    }

    async preLoad() {
        await this._getRoutes();
    }

    async _getRoutes() {
        return new Promise(resolve => {
            const router = document.querySelector("crs-router");
            const result = [];
            const fn = () => {
                router.removeEventListener("ready", fn);

                const routes = router.routesDef;
                for (let route of routes.routes) {
                    if (route.hash != "#404") {
                        result.push({title: route.title, hash: route.hash});
                    }
                }

                crsbinding.data.setProperty(this, "routes", result);
                resolve();
            };

            if (router.routesDef != null) {
                fn();
            }
            else {
                router.addEventListener("ready", fn);
            }
        });
    }
}