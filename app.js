const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();


function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


async function loginRUB(driver) {
    const RUB_IP = process.env.RUB_IP;

    try {
        await driver.get(`http://${RUB_IP}/vue/#/core/local`);
        console.log('🌐 RUB page found successfully.');
    } catch (error) {
        console.log(`❌ RUB page not found ${error.message}.`);
        driver.quit();
        process.exit(1);
    }
    
    try {
        const loginField = driver.wait(until.elementLocated(By.id('login-fld-usr')), 10000);
        await loginField.sendKeys(process.env.RUB_USER);
        console.log('🔐 Login field founded and filled.');
    } catch (error) {
        console.log(`❌ Login field not found ${error.message}.`);
        driver.quit();
        process.exit(1);
    }
    
    try {
        const passwordField = driver.wait(until.elementLocated(By.id('login-fld-pwd')), 10000);
        await passwordField.sendKeys(process.env.RUB_PASSWORD);
        console.log('🔐 Password field founded and filled.');
    } catch (error) {
        console.log(`❌ Password field not found ${error.message}.`);
        driver.quit();
        process.exit(1);
    }
    
    const loginButton = driver.wait(until.elementLocated(By.id('login-vbtn-loginbtn')), 10000);
    await loginButton.click();

    try {
        const errorElement = await driver.wait(
        until.elementLocated(By.css('.flexItem.errorbody')),
        1000);

        const errorText = await errorElement.getText();
        if (errorText.includes('Senha e/ou usuário inválido')) {
            console.log('❌ Login or password is incorrect.');
            await driver.quit();
            process.exit(1);
        }

    } catch (error) {
        console.log('🔓 Successfully logged in.');
    }
    
}


async function applyFilter(driver) {
    const filterButton = driver.wait(until.elementLocated(By.id('local-vbtn-optionsdialogopenbutton')), 10000);
    await filterButton.click();
    console.log('⚙️ Filter clicked successfully.');
}


async function run() {
    const options = new chrome.Options();
    options.addArguments('log-level=3');  // shows only erros in the terminal

    const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

    try {
        await loginRUB(driver);
        await applyFilter(driver);
        await delay(2);
    } finally {
        await driver.quit();
    }
}


run();