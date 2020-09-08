const {Given, After} = require('cucumber');

Given('a browser is open', async function () {
    await this.initBrowser();
});

After(async function () {
    await this.driver.quit();
});
