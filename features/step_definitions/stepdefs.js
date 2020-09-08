const assert = require('assert');
const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// driver setup
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless", "--no-sandbox");
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

Given('a browser is open', () => {
    // not required since we build the driver at the top of this file
});

Given('we navigate to the landing page', async () => {
    await driver.get('http://www.cronn.de/');
});

Then('the company slogan can be seen', async () => {
    const slogan = await driver.findElement(By.xpath("//h1[contains(text(), 'wir entwickeln software')]"));
    const isDisplayed = await slogan.isDisplayed();
    assert.ok(isDisplayed);
});

Then('the page title is correct', async () => {
    const title = await driver.getTitle();
    assert.strictEqual(title, 'cronn GmbH - wir entwickeln software_');
});

Given('the cookie warning can be seen', async () => {
    const cookieWarning = await driver.wait(until.elementLocated(By.linkText("Akzeptieren")), 5000);
    const isDisplayed = await cookieWarning.isDisplayed();
    assert.ok(isDisplayed);
});

When('we accept cookies', async () => {
    const cookieWarning = await driver.findElement(By.linkText("Akzeptieren"));
    await cookieWarning.click();
});

Then('the cookie warning cannot be seen anymore', async () => {
    const cookieWarning = await driver.findElement(By.xpath("//a[contains(text(), 'Akzeptieren')]"));
    await driver.wait(until.elementIsNotVisible(cookieWarning), 5000);
    const isDisplayed = await cookieWarning.isDisplayed();
    assert.ok(!isDisplayed);
});

AfterAll('end', async () => {
    await driver.quit();
});
