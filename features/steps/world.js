const {setWorldConstructor} = require("cucumber");
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

// variables & methods of this class can be access by any step definition
// see https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md
class BrowserWorld {

    constructor({ attach, log, parameters }) {
        this.attach = attach;
        this.log = log;
        this.parameters = parameters;
    }

    async initBrowser() {
        const chromeOptions = new chrome.Options();
        chromeOptions.headless();
        chromeOptions.addArguments("--no-sandbox", "--disable-dev-shm-usage");
        const firefoxOptions = new firefox.Options();
        firefoxOptions.headless();
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .setFirefoxOptions(firefoxOptions)
            .build();
    }

}

setWorldConstructor(BrowserWorld);
