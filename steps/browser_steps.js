const {Given, After} = require('cucumber');

Given('a browser is open', async function () {
    await this.initBrowser();
});

// increase timeout for slow test runners
After({timeout: 10 * 5000}, async function () {
    await this.driver.quit();
});
