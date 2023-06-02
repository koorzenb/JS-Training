
import Binding from "../src/binding.js";
import 'regenerator-runtime/runtime';

describe("Binding", () => {
    let binding;

    it("should have a dispose method", () => {
        binding = new Binding("div");
        expect(binding.dispose).toBeDefined();
    }
    );

    it("should have a textParser method", () => {
        expect(binding._textParser).toBeDefined();
    }
    );

    it('parse text successfully', () => {
        // const context = {firstname: "John", lastname: "Smith", age: 20};
        // binding = new Binding(`<div>{{firstName}}</div>`);
        // const newText = binding._textParser(context);
        // const expectedText = `<div>John</div>`;
        // expect(newText).toBe(expectedText);
    });

    it("element not string of HTMLElement", () => {
        const result = binding._textParser;
        expect(result).toBeDefined();
        expect(result).toThrow();
    });
});