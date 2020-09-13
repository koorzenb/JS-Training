import { loadOptions } from "@babel/core"
import { ViewBase } from "crs-binding/crs-view-base"

export default Project2 extends ViewBase {

    load() {
        super.load();
    }

    async preload(setPropertyCallback) {
        setPropertyCallback()
    }

}