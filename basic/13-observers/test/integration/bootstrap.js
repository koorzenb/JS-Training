global.testing = {};

const {beforeFn, afterFn, beforeEachFn, afterEachFn} = require("./../lib/bootstrap-functions.js");
// const {auth} = require("./../lib/test-helpers.js");
// const TestHelper = require("../integration/lib/generic-components/test-helper.js");

before(async function () {
    // await cleanFolders();
    await beforeFn();
});

after(async function () {
    await afterFn.call();
});

beforeEach(async function () {
    await beforeEachFn.call(this);
});

afterEach(async function () {
    await afterEachFn.call(this);
});