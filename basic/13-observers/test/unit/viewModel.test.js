const {ViewModel} = require("../../src/viewModel.js");
const {expect} = require("chai");

describe("ViewModel", () => {
    let viewModel;

    beforeEach(() => {
        viewModel = new ViewModel;
    });

    afterEach(() => {

    });

    it("_setupValidator", () => {
        console.log("logging " + viewModel);
        const validator = ViewModel._setupValidator();
        const proxy = new Proxy({}, validator);
        proxy.name = "John";
        expect(proxy.result).to.be.true;
    });

});