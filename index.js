const { chromium } = require('playwright');  // Import Playwright

(async () => {
  const browser = await chromium.launch();  // Launch Chromium browser
  const page = await browser.newPage();  // Open a new page
  await page.goto('https://www.google.com');  // Navigate to Google
  await page.screenshot({ path: 'google.png' });  // Take a screenshot
  await browser.close();  // Close the browser
})();
