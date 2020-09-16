import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

export default class Project2 extends ViewBase {

// Project: https://github.com/caperaven/training/blob/master/accessibility/03.project2.md

    load() {
        crsbinding.data.updateUI(this._dataId, "items");
        super.load();
    }

    async preLoad(setPropertyCallback) {
        setPropertyCallback("items", this.getRenderData());
        console.log(this.getRenderData());
    }

    getRenderData() {
// how to load multiple objs. Speak to Rabie
        const navigation = [
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
                title: "Welcome",
                body: "Id diam maecenas ultricies mi eget mauris pharetra et. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar."
            },
        ]

        const result = [];
        const banner = ["Logo"];
        navigation.forEach(item => {
            result.push({title: item.title}, {link: item.link})
        })

        return {banner, result};
    }

}