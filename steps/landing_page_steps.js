const assert = require("assert");
const { Given, When, Then } = require("cucumber");

// we can define timeouts for async functions, defaults to 5000ms
// see https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md
Given("we navigate to the landing page", async function () {
  this.page = await this.browser.newPage();
  await this.page.goto("http://www.cronn.de/");
});

Then("the company slogan can be seen", async function () {
  await this.page.waitForSelector("text=wir entwickeln software");
});

Then("the page title is correct", async function () {
  const title = await this.page.title();
  assert.strictEqual(title, "cronn GmbH - wir entwickeln software_");
});

Given("the cookie warning can be seen", async function () {
  this.privacyOverlay = await this.page.waitForSelector(
    "//div[starts-with(normalize-space(.), 'Bitte akzeptieren Sie unsere Datenschutzvereinbarung')]"
  );
});

When("we accept cookies", async function () {
  this.page.click("text='Akzeptieren'");
});

Then("the cookie warning cannot be seen anymore", async function () {
  await this.privacyOverlay.waitForElementState("hidden");
});
