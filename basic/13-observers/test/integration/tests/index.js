const {setup, tearDown} = require("../../lib/bootstrap-functions");
const expect = require("chai").expect;

describe('Testing observer pattern', async () => {

    before(async () => {
        await setup();
    });

    after(async function () {
        await tearDown();
    });

    it('Testing observed results - wrong data - no results', async () => {
        const nameInput = await global.testing.page.$('#name');
        await nameInput.type('Barend');

        const lastNameInput = await global.testing.page.$('#lastName');
        await lastNameInput.type('Koorzen');

        const ageInput = await global.testing.page.$('#age');
        await ageInput.type('20');

        const submitButton = await global.testing.page.waitForSelector('#submit');
        await submitButton.click();
        await global.testing.page.waitFor(1000);

        const results = await global.testing.page.$("#results");

        const text = await results.evaluate(_ => _.innerText);
        console.log(text);
        // expect(text).to.equal("Results");
        expect(text, `value = ${text}`).to.be.a("string").which.is.empty;
    });
});
