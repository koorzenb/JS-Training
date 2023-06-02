// const url = require("./env.js");
const puppeteer = require('../../node_modules/puppeteer');
// const {SystemHelper} = require("../integration/lib/system/system-helper.js");
// const {auth, setupLogging, writeCoverage, setupCoverage, tearDownCoverage} = require("./test-helpers.js");
const fs = require("fs");
const path = require("path");
// const {ConsoleHelper} = require("../integration/lib/system/console-helper.js");
// global.testSuite = process.argv.some(_ => _.includes("test/integration/generic-tests") || _.includes("test\\integration\\generic-tests")) === true ? "generic-tests" : "tests";

function setTestingOptions() {
    return {
        coverage: [],
        elementHandles: [],
        errors: [],
        baseAddress: `http://127.0.0.1:8000/`,
        baseQuery: "[name='development_azure_account']",
        sloMo: process.argv.includes("--sloMo"),
        tracing: true
    };
}

/** configurable options or object for puppeteer */
function setPuppeteerLaunchOptions(options) {
    return {
        args: ['--start-maximized'],
        ignoreHTTPSErrors: true,
        headless: false,
        slowMo: options.sloMo ? 100 : 0,
        timeout: 50000,
        defaultViewport: options.teamcity ? {width: 1600, height: 900} : null,
        devtools: false
    };
}

async function launchBrowser(options) {
    const opts = setPuppeteerLaunchOptions(options);

    global.testing.browser = await puppeteer.launch(opts);
    const targets = await global.testing.browser.targets();
    const target = targets.find(t => t.type() === "page");
    global.testing.page = await target.page();
}

/**
 * Setup test environment for full and debug runs from webstorm
 * NOTE: This method is called multiple times any modifications must be re-runnable
 * @returns {Promise<void>}
 */
const beforeFn = async function () {
    const options = setTestingOptions();

    global.testing == null && (global.testing = options);
    Object.assign(global.testing, options);

    if (global.testing.browser == null) await launchBrowser(options);
};

/**
 * Called after every test suits completes, handles coverage data
 * @returns {Promise<void>}
 */
const afterFn = async function () {
    await global.testing.browser.close();
};

/**
 * Called before every test
 * @returns {Promise<void>}
 */
const beforeEachFn = async function () {
};

/**
 * Called after every test, adds debug data for full test runs.
 * @returns {Promise<void>}
 */
const afterEachFn = async function () {
    const title = this.currentTest?.title || this.ctx?.currentTest?.title;
};

/**
 * Called by every test full and debug runs, handles initial authentication
 * @param url
 * @returns {Promise<void>}
 */
const setup = async function (url) {
    await beforeFn();

    if (url != null) {
        await global.testing.page.goto(`${global.testing.baseAddress}${url}`, {waitUntil: "networkidle2"});
    } else {
        await global.testing.page.goto(`${global.testing.baseAddress}`, {waitUntil: "networkidle2"});
    }
};

/**
 * Called after all tests have run. Closes the browser in the case of a debug run from webstorm
 * @returns {Promise<void>}
 */
const tearDown = async function () {
    await global.testing.browser.close();
};

/**
 * Cleans up debug folders for development environment
 * @returns {Promise<void>}
 */
const cleanFolders = async function () {
};

module.exports = {
    afterFn,
    afterEachFn,
    beforeFn,
    beforeEachFn,
    cleanFolders,
    launchBrowser,
    setup,
    setTestingOptions,
    tearDown
};