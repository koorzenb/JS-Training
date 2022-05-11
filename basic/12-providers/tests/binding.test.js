
const Binding = require("../src/binding.js");
import 'regenerator-runtime/runtime';

describe("Binding", () => {
    let binding;
    beforeEach(() => {
        binding = new Binding("element", "context");
    }
    );

    afterEach(() => {
        binding.dispose();
    }
    );

    it("should create a construct", () => {
        expect(binding).toBeDefined();
    }
    );

    it("should have a data property", () => {
        const data = binding.data;
        expect(data).toBeDefined();
        expect(data.firstName).toBeDefined();
        expect(data.lastName).toBeDefined();
        expect(data.age).toBeDefined();
    }
    );

    it("should have a dispose method", () => {
        expect(binding.dispose).toBeDefined();
    }
    );

    it("should have a textParser method", () => {
        expect(binding.textParser).toBeDefined();
        const data = binding.data;
        const text = `<div>{{firstName}}</div>`;
        const newText = binding.textParser(text, data);
        const expectedText = `<div>John</div>`;
        expect(newText).toBe(expectedText);
    }
    );
});