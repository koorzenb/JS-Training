const {beforeFn, afterFn, beforeEachFn, afterEachFn, cleanFolders} = require("./../lib/bootstrap-functions.js");

before(async function () {
    await beforeFn.call();
    console.log("working");

    const launch = {
        args: ['--start-maximized'],
        ignoreHTTPSErrors: true,
        headless: !!options.teamcity && !global.testSuite.includes("generic-tests"),
        slowMo: options.sloMo ? 100 : 0,
        timeout: 50000,
        defaultViewport: options.teamcity ? {width: 1600, height: 900} : null,
        devtools: false
    };

    global.testing.browser = await puppeteer.launch(luanch);
    const targets = await global.testing.browser.targets();
    const target = targets.find(t => t.type() === "page");
    global.testing.page = await target.page();
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