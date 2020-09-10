const { setWorldConstructor, setDefaultTimeout } = require("cucumber");
const { chromium, webkit, firefox } = require("playwright");

// By default, cucumbers asynchronous hooks and steps timeout after 5000 milliseconds.
// Playwrights timeout defaults to 30 seconds, so we are setting cucumbers timeout twice as high.
setDefaultTimeout(60 * 1000);

// variables & methods of this class can be access by any step definition
// see https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md
class BrowserWorld {
  constructor({ attach, log, parameters }) {
    this.attach = attach;
    this.log = log;
    this.parameters = parameters;
  }

  async launchBrowser() {
    const browserName = process.env.BROWSER || "chromium";
    this.browser = await { chromium, webkit, firefox }[browserName].launch({
      //   headless: false,
      //   slowMo: 250,
    });
  }
}

setWorldConstructor(BrowserWorld);
