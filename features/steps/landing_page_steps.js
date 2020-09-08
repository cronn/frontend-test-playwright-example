const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const { By, until } = require('selenium-webdriver');

Given('we navigate to the landing page', async function() {
    await this.driver.get('http://www.cronn.de/');
});

Then('the company slogan can be seen', async function() {
    const slogan = await this.driver.findElement(By.xpath("//h1[contains(text(), 'wir entwickeln software')]"));
    const isDisplayed = await slogan.isDisplayed();
    assert.ok(isDisplayed);
});

Then('the page title is correct', async function() {
    const title = await this.driver.getTitle();
    assert.strictEqual(title, 'cronn GmbH - wir entwickeln software_');
});

Given('the cookie warning can be seen', async function() {
    const cookieWarning = await this.driver.wait(until.elementLocated(By.linkText("Akzeptieren")), 5000);
    const isDisplayed = await cookieWarning.isDisplayed();
    assert.ok(isDisplayed);
});

When('we accept cookies', async function() {
    const cookieWarning = await this.driver.findElement(By.linkText("Akzeptieren"));
    await cookieWarning.click();
});

Then('the cookie warning cannot be seen anymore', async function() {
    // cannot find invisible elements by link text, thus use xpath
    const cookieWarning = await this.driver.findElement(By.xpath("//a[contains(text(), 'Akzeptieren')]"));
    await this.driver.wait(until.elementIsNotVisible(cookieWarning), 5000);
    const isDisplayed = await cookieWarning.isDisplayed();
    assert.ok(!isDisplayed);
});
