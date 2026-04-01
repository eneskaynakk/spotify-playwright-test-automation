const { chromium } = require('@playwright/test');
const readline = require('readline');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://accounts.spotify.com/login');

    await page.getByLabel('E-posta adresi veya kullanıcı adı').click();
    await page.getByLabel('E-posta adresi veya kullanıcı adı').fill('youremail@gmail.com');
    await page.getByRole('button', {name: 'Devam'}).click();

    await new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin });
        rl.on('line', () => {
        rl.close();
        resolve();
        });
    });

    await context.storageState({ path: 'spotify-session.json' });

})();