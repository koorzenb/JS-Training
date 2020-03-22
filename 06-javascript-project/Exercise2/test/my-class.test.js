import {Calculator} from "../src/calculator.js";

let instance;

beforeEach(() => {
    instance = new Calculator();
});

afterEach(() => {
    instance.dispose();
});

test("my-class - constructed", () => {
    expect(instance).not.toBeNull();
});