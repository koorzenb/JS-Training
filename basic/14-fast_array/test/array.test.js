const {processData, getData, generateProcessor} = require('../index');

describe("fast array processing", () => {
    let testArray;
    beforeEach(() => {
        testArray = [{siteValue: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
    });

    test('processData should exist', () => {
        expect(processData).toBeDefined();
    });

    test('getData should exist', () => {
        expect(getData).toBeDefined();
    });

    test("getData sample", () => {
        const data = getData();
        expect(data[0].value).toBeDefined;
        expect(data[0].code).toBeDefined;
    });

    test('processData should return an object', () => {
        expect(processData()).toBeInstanceOf(Object);
    });

    test('processData should return an result object with the correct properties', () => {
        const processor = generateProcessor(testArray[0]);
        expect(processor.result.value).toHaveProperty('min');
        expect(processor.result.value).toHaveProperty('max');
        expect(processor.result.value).toHaveProperty('avg');
        expect(processor.result.value).toHaveProperty('type');
        expect(processor.result.code).toHaveProperty('aggregate');
        expect(processor.result.code).toHaveProperty('uniqueValues');
        expect(processor.result.code).toHaveProperty('type');
    });

    // test('generateProcessor returns correct results ', () => {
    //     const data = getData();
    //     const processor = generateProcessor(data[0]);
    //     expect(processor.result.value.type).toBe('number');
    //     expect(processor.result.value.min).toBeDefined;
    //     expect(processor.result.value.max).toBeDefined;
    //     expect(processor.result.value.avg).toBeDefined;
    //     expect(processor.result.code.type).toBe("string");
    //     expect(processor.result.code.aggregate).toBeDefined;
    //     expect(processor.result.code.uniqueValues).toBeDefined;

    // });

    // test('calc min', () => {
    //     const results = processArray(testArray);
    //     expect(results.value.min).toBe(10);

    // });

    // test('calc max', () => {
    //     const results = processArray(testArray);
    //     expect(results.value.max).toBe(30);
    // });

    // test('calc avg', () => {
    //     const results = processArray(testArray);
    //     expect(results.value.avg).toBe(17.5);
    // });

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