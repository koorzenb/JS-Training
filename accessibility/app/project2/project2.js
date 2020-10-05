import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/03.project2.md

    load() {
        crsbinding.data.updateUI(this._dataId, "nav");
        crsbinding.data.updateUI(this._dataId, "main");
        crsbinding.data.updateUI(this._dataId, "aside");
        crsbinding.data.updateUI(this._dataId, "banner");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        // I had data in flat list, but then had to add "type" property to distinguish. This had side effect of many unused properties in DOM 
        setPropertyCallback("nav", this.getRenderData().navArray);
        setPropertyCallback("main", this.getRenderData().mainArray);
        setPropertyCallback("aside", this.getRenderData().asideArray);
        setPropertyCallback("banner", this.getRenderData().banner);
        console.log(this.getRenderData().mainArray);
    }

    getRenderData() {
        // rather have items, nav, main, etc. 
        const nav = [
            {
                title: "Home",
                link: "www.google.com"
            },
            {
                title: "About",
                link: "www.google.com"
            },
            {
                title: "Contact",
                link: "www.google.com"
            }
        ]

        const main = [
            {
                title: "Welcome",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst quisque sagittis purus sit amet volutpat consequat. "
            },
            {
                title: "What we do",
                body: "Leo a diam sollicitudin tempor id eu. Vitae tortor condimentum lacinia quis. Ipsum a arcu cursus vitae congue. Enim facilisis gravida neque convallis a cras semper."
            },
            {
                title: "Why we do it",
                body: "Id diam maecenas ultricies mi eget mauris pharetra et. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar."
            }
        ]

        const aside = [
            {
                title: "Banner",
                link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Banner_role"
            },
            {
                title: "Navigation",
                link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role"
            },
            {
                title: "Main",
            },
            {
                title: "Aside",
                link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Complementary_role"
            },
            {
                title: "Footer",
            }
        ]

        const navArray = [];
        const mainArray = [];
        const asideArray = [];
        const banner = ["Logo"];
        nav.forEach(item => {
            navArray.push({title: item.title, link: item.link})
        })
        main.forEach(item => {
            mainArray.push({title: item.title, body: item.body})
        })
        aside.forEach(item => {
            asideArray.push({title: item.title, link: item.link})
        })

        return {banner, navArray, mainArray, asideArray};
    }

}