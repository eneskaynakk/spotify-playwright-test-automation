import { test as base } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

type MyFixture = {
  basePage: BasePage;
  
};

export const test = base.extend<MyFixture>({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if(testInfo.status !== testInfo.expectedStatus) {
      const timestamp = new Date();
      const formattedDate = [
        String(timestamp.getDate()).padStart(2, '0'),
        String(timestamp.getMonth() + 1).padStart(2, '0'),timestamp.getFullYear(),
        String(timestamp.getHours()).padStart(2, '0'),
        String(timestamp.getMinutes()).padStart(2, '0'),
        String(timestamp.getSeconds()).padStart(2, '0'),
      ].join('-');

      const screenshotPath = `screenshots/screenshot-${formattedDate}.png`;
      await page.screenshot({ path: screenshotPath });

      await testInfo.attach('Error Screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });

    }
  },

  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

});

export { expect } from '@playwright/test';