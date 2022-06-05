const {setup, tearDown} = require("../../lib/bootstrap-functions");
const expect = require("chai").expect;

describe('Testing observer pattern', async () => {

    let nameInput, lastNameInput, ageInput, submitButton, results;
    before(async () => {
        await setup();
        // await global.testing.page.goto(`http://127.0.0.1:8000/`, {waitUntil: "networkidle2"});
        await global.testing.page.waitForTimeout(100);

    });

    beforeEach(async () => {
        await global.testing.page.waitForTimeout(100);
    });

    after(async function () {
        await tearDown();
    });

    it('Testing observed results - wrong data - no results', async () => {
        nameInput = await global.testing.page.$('#name');
        lastNameInput = await global.testing.page.$('#lastName');
        ageInput = await global.testing.page.$('#age');
        submitButton = await global.testing.page.waitForSelector('#submit');
        results = await global.testing.page.$("#results");

        await nameInput.type('John');
        await lastNameInput.type('Koorzen');
        await ageInput.type('40');
        await submitButton.click();
        await global.testing.page.waitForTimeout(100);
        const resultsText = await results.evaluate(_ => _.innerText);
        expect(resultsText, `value = ${resultsText}`).to.be.a("string").which.is.empty;
        const ageText = await ageInput.evaluate(_ => _.value);
        expect(ageText, `value = ${resultsText}`).to.be.a("string").which.equals("30");

    });

    it('Testing observed results - right data - show results', async () => {
        nameInput = await global.testing.page.$('#name');
        lastNameInput = await global.testing.page.$('#lastName');
        ageInput = await global.testing.page.$('#age');
        submitButton = await global.testing.page.waitForSelector('#submit');
        results = await global.testing.page.$("#results");

        await nameInput.type('Barend');
        await lastNameInput.type('Koorzen');
        await ageInput.type('20');
        await submitButton.click();
        await global.testing.page.waitForTimeout(100);
        const text = await results.evaluate(_ => _.innerText);
        console.log(text);
        expect(text, `value = ${text}`).to.be.a("string").which.equal("found you John");
    });
});
