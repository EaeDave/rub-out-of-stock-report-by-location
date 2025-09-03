const { Builder } = require('selenium-webdriver');
require('dotenv').config();

function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


async function run() {
    const chrome = await new Builder().forBrowser('chrome').build();
    const RUB_IP = process.env.RUB_IP;

    try {
        await chrome.get(`http://${RUB_IP}/vue/#/core/local`);
        await delay(2);
    } finally {
        await chrome.quit();
    }
}


run();