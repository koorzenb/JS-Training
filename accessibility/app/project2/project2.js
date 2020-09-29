import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/03.project2.md

    load() {
        crsbinding.data.updateUI(this._dataId, "items");
        crsbinding.data.updateUI(this._dataId, "banner");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", this.getRenderData().result);
        setPropertyCallback("banner", this.getRenderData().banner);
        console.log(this.getRenderData().result);
    }

    getRenderData() {
        // rather have items, nav, main, etc. 
        const items = [
            {
                type: "navigation",
                title: "Home",
                link: "www.google.com"
            },
            {
                type: "navigation",
                title: "About",
                link: "www.google.com"
            },
            {
                type: "navigation",
                title: "Contact",
                link: "www.google.com"
            },
            {
                type: "main",
                title: "Welcome",
                body: "1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet volutpat consequat. "
            },
            {
                type: "main",
                title: "What we do",
                body: "2Leo a diam sollicitudin tempor id eu. Vitae tortor condimentum lacinia quis. Ipsum a arcu cursus vitae congue. Enim facilisis gravida neque convallis a cras semper."
            },
            {
                type: "main",
                title: "Why we do it",
                body: "3Id diam maecenas ultricies mi eget mauris pharetra et. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar."
            },
            {
                type: "aside",
                title: "Banner",
            },
            {
                type: "aside",
                title: "Navigation",
            },
            {
                type: "aside",
                title: "Main",
            },
            {
                type: "aside",
                title: "Aside",
            },
            {
                type: "aside",
                title: "Footer",
            },
            {
                type: "footer",
                title: "Terms",
                link: "www.google.com"   
            },
            {
                type: "footer",
                title: "Support",
                link: "www.google.com"   
            }
        ]

        const result = [];
        const banner = ["Logo"];
        items.forEach(item => {
            result.push({type: item.type, title: item.title, link: item.link, body: item.body})
        })

        return {banner, result};
    }

}