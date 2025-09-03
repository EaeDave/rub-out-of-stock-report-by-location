const { Builder } = require('selenium-webdriver');
require('dotenv').config();

async function run() {
    const chrome = await new Builder().forBrowser('chrome').build();
    const RUB_IP = process.env.RUB_IP;

    try {
        await chrome.get(`http://${RUB_IP}/vue/#/core/local`);
    } finally {
        await chrome.quit();
    }
}


run();