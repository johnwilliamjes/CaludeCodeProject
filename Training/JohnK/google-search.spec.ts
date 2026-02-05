import { test, expect, Page } from '@playwright/test';

test.describe('Google Search Tests', () => {
  test('search for test automation on Google', async ({ page }: { page: Page }) => {
    // Navigate to Google with longer timeout
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait a moment for the page to fully load
    await page.waitForTimeout(2000);

    // Accept cookies if the dialog appears (common in some regions)
    try {
      const acceptButton = page.locator('button:has-text("Accept all"), button:has-text("I agree"), button:has-text("Reject all")').first();
      if (await acceptButton.isVisible({ timeout: 3000 })) {
        await acceptButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (error) {
      // Continue if no cookie dialog appears
      console.log('No cookie dialog found or already dismissed');
    }

    // Wait for the search input to be visible
    const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });

    // Type the search query slowly to mimic human behavior
    await searchBox.click();
    await searchBox.type('test automation', { delay: 100 });
    await page.waitForTimeout(1000);

    // Submit the search (press Enter)
    await searchBox.press('Enter');

    // Wait for navigation
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check if we got blocked by CAPTCHA
    const currentUrl = page.url();
    if (currentUrl.includes('sorry/index')) {
      console.log('⚠️  Google detected automation and showed CAPTCHA. This is expected with automated testing.');
      test.skip();
      return;
    }

    // Verify we're on the search results page
    await expect(page).toHaveURL(/search/);

    // Verify search results are displayed
    const searchResults = page.locator('#search');
    await expect(searchResults).toBeVisible();

    // Verify at least one search result is present
    const resultLinks = page.locator('#search a[href]');
    await expect(resultLinks.first()).toBeVisible();

    // Optional: Log the number of results found
    const resultsCount = await resultLinks.count();
    console.log(`Found ${resultsCount} search result links`);

    // Optional: Take a screenshot
    await page.screenshot({ path: 'google-search-results.png', fullPage: true });
  });

  test('verify Google homepage elements', async ({ page }: { page: Page }) => {
    // Navigate to Google
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check if we got blocked by CAPTCHA
    const currentUrl = page.url();
    if (currentUrl.includes('sorry/index')) {
      console.log('⚠️  Google detected automation and showed CAPTCHA. This is expected with automated testing.');
      test.skip();
      return;
    }

    // Verify the search box is present (more reliable than logo)
    const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    await expect(searchBox).toBeVisible({ timeout: 10000 });

    // Verify page title contains Google
    await expect(page).toHaveTitle(/Google/);
  });
});
