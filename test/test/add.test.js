const { add } = require("../src/add");
const { Operator } = require("../src/operator");

describe("incementally testing jest functionality", () => {

    test("Testing add", () => {
        const sum = add(2,3);
        expect(sum).toEqual(5);
    })

    test("minus", () => {
        const operator= new Operator();
        const sum = operator.minus(5, 2);
        expect(sum).toEqual(3);
    })
})