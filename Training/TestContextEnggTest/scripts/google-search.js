#!/usr/bin/env node

const { chromium } = require('playwright');

function getArg(name) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1) return process.argv[idx + 1];
  return null;
}

(async () => {
  const queryArg = getArg('query') || process.argv[2];
  const context = getArg('context') || '';

  if (!queryArg) {
    console.error('Usage: node scripts/google-search.js --query "your query" [--context "optional context"]');
    process.exit(1);
  }

  const query = context ? `${context} ${queryArg}` : queryArg;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set a reasonable user agent
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36');

    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    // Try to close consent dialogs when present (text varies by region)
    const acceptSelectors = [
      'text=I agree',
      'text=I Accept',
      'text=Accept all',
      'text=Agree',
      'button:has-text("Accept")',
      'button:has-text("I agree")'
    ];
    for (const sel of acceptSelectors) {
      const el = await page.$(sel);
      if (el) {
        try { await el.click({ timeout: 2000 }); } catch (e) { /* ignore click errors */ }
      }
    }

    // Fill search box and submit
    await page.fill('input[name="q"]', query);
    await page.keyboard.press('Enter');

    await page.waitForSelector('div#search', { timeout: 10000 });

    const resultElements = await page.$$('div#search .g');
    const results = [];

    for (let i = 0; i < Math.min(5, resultElements.length); i++) {
      const el = resultElements[i];

      const title = await el.$eval('h3', node => node.innerText).catch(() => '');
      const url = await el.$eval('a', a => a.href).catch(() => '');
      // snippet selectors vary; Try common ones
      const snippet = await el.$eval('.IsZvec', s => s.innerText).catch(async () => {
        return await el.$eval('.VwiC3b', s => s.innerText).catch(() => '');
      });

      if (title || url || snippet) {
        results.push({ title: title.trim(), url: url.trim(), snippet: snippet.trim() });
      }
    }

    const output = { query: queryArg, context: context, results };
    console.log(JSON.stringify(output, null, 2));

  } catch (err) {
    console.error('Error during search:', err && err.message ? err.message : err);
    process.exitCode = 2;
  } finally {
    if (browser) await browser.close();
  }
})();
