const { Builder, By, until } = require('selenium-webdriver');
require('dotenv').config();

function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


async function loginRUB(chrome) {
    const RUB_IP = process.env.RUB_IP;
    await chrome.get(`http://${RUB_IP}/vue/#/core/local`);
    
    const loginField = await chrome.wait(until.elementLocated(By.id('login-fld-usr')), 10000);
    loginField.sendKeys(process.env.RUB_USER);

    const passwordField = await chrome.wait(until.elementLocated(By.id('login-fld-pwd')), 10000);
    passwordField.sendKeys(process.env.RUB_PASSWORD);

    const loginButton = await chrome.wait(until.elementLocated(By.id('login-vbtn-loginbtn')), 10000);
    loginButton.click();
    console.log('🔐 Successfully logged in.');
}


async function run() {
    const chrome = await new Builder().forBrowser('chrome').build();

    try {
        await loginRUB(chrome);
        await delay(2);
    } finally {
        await chrome.quit();
    }
}


run();