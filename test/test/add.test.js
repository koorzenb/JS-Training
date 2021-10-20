const { add } = require("../src/add")

describe("incementally testing jest functionality", () => {

    test("Testing add", () => {
        const sum = add(2,3);
        expect(sum).toEqual(5);
    })
})