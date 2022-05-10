import {ViewModel} from "viewModel.js";

describe("ViewModel", () => {
    let viewModel;
    beforeEach(() => {
        viewModel = new ViewModel();
    }
    );
    afterEach(() => {
        viewModel.dispose();
    }
    );
    it("should create a viewModel", () => {
        expect(viewModel).toBeDefined();
    }
    );
    it("should have a data property", () => {
        expect(viewModel.data).toBeDefined();
    }
    );
    it("should have a dispose method", () => {
        expect(viewModel.dispose).toBeDefined();
    }
    );
    it("should have a locateExpressions method", () => {
        expect(viewModel.locateExpressions).toBeDefined();
    }
    );
    it("should have a setData method", () => {
        expect(viewModel.setData).toBeDefined();
    }
    );
    it("should have a getData method", () => {
        expect(viewModel.getData).toBeDefined();
    }
    );
    it("should have a textParser method", () => {
        expect(viewModel.textParser).toBeDefined();
    }
    );
    it("should have a _init method", () => {
        expect(viewModel._init).toBeDefined();
    }
    );
    it("should have a _name method", () => {
        expect(viewModel._name).toBeDefined();
    }
    );
});