# Google Search Automation Script (TypeScript + Playwright)

This project contains a browser automation script built with TypeScript and Playwright that launches Google and performs a search.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

After installing the dependencies, install the browser binaries:

```bash
npm run install:browsers
```

Or manually:

```bash
npx playwright install chromium
```

## Running the Script

Run the TypeScript automation script directly:

```bash
npm run run
```

Or use ts-node:

```bash
npx ts-node test-automation.ts
```

## What the Script Does

1. Launches Chrome browser (visible mode)
2. Navigates to Google.com
3. Types "test automation" in the search box
4. Submits the search
5. Waits for results to load
6. Takes a screenshot of the results (full page)
7. Displays search statistics
8. Closes the browser

## Customization

You can modify the script to:
- Change the search query (line 33 in test-automation.ts)
- Run in headless mode by changing `headless: false` to `headless: true` (line 17)
- Add more test steps after the search
- Change the browser (`firefox` or `webkit` instead of `chromium`)
- Adjust the slowMo value for slower/faster execution

## Available Scripts

- `npm run run` - Run the automation script
- `npm run install:browsers` - Install Playwright browser binaries
- `npm test` - Run tests (headless mode)
- `npm run test:headed` - Run tests with visible browser

## Screenshot Output

The script saves a screenshot as `google_search_results.png` in the same directory.
