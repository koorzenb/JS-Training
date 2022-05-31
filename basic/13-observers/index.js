import {ViewModel} from "./src/viewModel";
const viewModel = new ViewModel;


let Subject = {
    _state: 0,
    _observers: [],
    add: function (observer) {
        this._observers.push(observer);
    },
    getState: function () {
        return this._state;
    },
    setState: function (value) {
        this._state = value;
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].signal(this);
        }
    }
};

const Observer = {
    signal: function (subject) {
        let currentValue = subject.getState();
        console.log(currentValue);
    }
};

Subject.add(Observer);
Subject.setState(10);

// Notes:
// Obs is loaded into the Subject - line 3
// fires signal on line 13 as side effect

// also check:
// https://excalidraw.com/#json=2R22gM4kcqBBe5w7-GXkw,BhkDEtZZKzCSoTo84B97EA