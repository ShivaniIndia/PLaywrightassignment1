const { chromium } = require('playwright');  // Import Playwright for Chromium browser

(async () => {
  // Launch Chromium browser (in non-headless mode so we can see the browser)
  const browser = await chromium.launch({ headless: false }); // headless: false makes the browser visible
  const page = await browser.newPage(); // Open a new page in the browser
  
  // Navigate to Amazon homepage
  await page.goto('https://www.amazon.com');
  console.log('Amazon homepage opened');

  // Search for an item (e.g., 'laptop')
  await page.fill('input[name="field-keywords"]', 'laptop');  // Fill the search bar with the word 'laptop'
  await page.press('input[name="field-keywords"]', 'Enter');   // Press 'Enter' to trigger the search
  console.log('Search initiated for "laptop"');
  
  // Wait for the results to load on the page
  await page.waitForSelector('.s-main-slot .s-result-item');  // Wait for the search results to appear

  // Click on the first product in the search results
  const firstItem = await page.$('.s-main-slot .s-result-item');  // Select the first product
  await firstItem.click();  // Click on that product to open its product page
  console.log('Clicked on the first product');

  // Wait for the product page to load and the "Add to Cart" button to be visible
  await page.waitForSelector('#add-to-cart-button');
  
  // Click the "Add to Cart" button
  await page.click('#add-to-cart-button');  // Add the item to the cart
  console.log('Item added to cart');
  
  // Navigate to the cart page
  await page.click('#nav-cart');  // Click the cart icon to go to the cart page
  await page.waitForSelector('.sc-list-item');  // Wait for cart items to load
  
  // Count the number of items in the cart to verify that the item was added
  const cartItems = await page.$$eval('.sc-list-item', items => items.length);  // Count the number of items in the cart
  console.log(`Items in cart: ${cartItems}`);

  // Close the browser
  await browser.close();  // Close the browser after the task is completed
})();

