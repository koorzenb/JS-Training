const processArray = require('../index');

describe("fast array processing", () => {

    test('standard array', () => {
        const testArray = [{value: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
        const results = processArray(testArray);
        expect(results.min).toBe(10);
        expect(results.avg).toBe(20);
        expect(results.max).toBe(30);
        expect(results.countAggregate).toBe([{"a": 3}, {"b": 1}]);
        expect(results.uniqueValues).toBe(["a", "b"]);
    });

});