const {processData, getData, generateProcessor} = require('../index');

describe("fast array processing", () => {
    let testArray;
    beforeEach(() => {
        testArray = [{value: 10, code: "a"}, {value: 10, code: "a"}, {value: 20, code: "a"}, {value: 30, code: "b"}];
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
});