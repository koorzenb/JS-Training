const processArray = require('../index');

describe("fast array processing", () => {
    let testArray;
    beforeEach(() => {
        testArray = [{value: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
    });

    test('calc min', () => {
        const results = processArray(testArray);
        expect(results.min).toBe(10);

    });

    test('calc max', () => {
        const results = processArray(testArray);
        expect(results.max).toBe(30);
    });

    test('calc avg', () => {
        const results = processArray(testArray);
        expect(results.avg).toBe(17.5);
    });

    // test('calc min', () => {
    //     const results = processArray(testArray);
    //     expect(results.uniqueValues).toBe(["a", "b"]);
    // });

    // test('calc min', () => {
    //     const results = processArray(testArray);
    //     expect(results.countAggregate).toBe([{"a": 3}, {"b": 1}]);
    // });

    // test('calc all results', () => {
    //     const results = processArray(testArray);
    //     expect(results.min).toBe(10);
    //     expect(results.avg).toBe(20);
    //     expect(results.max).toBe(30);
    //     expect(results.countAggregate).toBe([{"a": 3}, {"b": 1}]);
    //     expect(results.uniqueValues).toBe(["a", "b"]);
    // });

});