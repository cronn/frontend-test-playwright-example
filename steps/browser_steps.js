const { Given, After } = require("cucumber");

Given("a browser is open", async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.browser.close();
});
