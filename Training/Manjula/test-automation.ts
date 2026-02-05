/**
 * Google Search Automation Script using TypeScript and Playwright
 * This script launches Google Chrome and performs a search for 'test automation'
 */

import { chromium, Browser, Page, BrowserContext } from '@playwright/test';

async function runGoogleSearch(): Promise<void> {
    let browser: Browser | null = null;
    let context: BrowserContext | null = null;
    let page: Page | null = null;

    try {
        // Launch browser (use headless: true to run without UI)
        console.log('Launching browser...');
        browser = await chromium.launch({
            headless: false,
            slowMo: 500  // Slow down actions by 500ms for better visibility
        });

        // Create a new browser context and page
        context = await browser.newContext();
        page = await context.newPage();

        // Navigate to Google
        console.log('Navigating to Google...');
        await page.goto('https://www.google.com');

        // Wait for the search box to be visible
        await page.waitForSelector('textarea[name="q"]', { timeout: 5000 });

        // Type in the search box
        console.log('Typing search query...');
        await page.fill('textarea[name="q"]', 'test automation');

        // Press Enter to search
        console.log('Submitting search...');
        await page.press('textarea[name="q"]', 'Enter');

        // Wait for search results to load
        await page.waitForSelector('#search', { timeout: 10000 });
        console.log('Search results loaded successfully!');

        // Get the page title
        const title = await page.title();
        console.log(`Page title: ${title}`);

        // Take a screenshot
        const screenshotPath = 'google_search_results.png';
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to: ${screenshotPath}`);

        // Wait a bit to see the results
        await page.waitForTimeout(3000);

        // Get search result count (optional)
        const resultStats = await page.locator('#result-stats').textContent();
        if (resultStats) {
            console.log(`Search stats: ${resultStats}`);
        }

        console.log('Test automation completed successfully!');

    } catch (error) {
        console.error('An error occurred:', error);
        if (page) {
            await page.screenshot({ path: 'error_screenshot.png' });
            console.log('Error screenshot saved to: error_screenshot.png');
        }
    } finally {
        // Close the browser
        console.log('Closing browser...');
        if (context) await context.close();
        if (browser) await browser.close();
        console.log('Automation completed!');
    }
}

// Run the automation
runGoogleSearch();
