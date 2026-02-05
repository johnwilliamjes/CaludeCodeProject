# Playwright Google Search Test Automation

This project contains Playwright test automation scripts for Google search functionality, written in TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests with UI mode:
```bash
npm run test:ui
```

View test report:
```bash
npm run report
```

## Test Coverage

- **google-search.spec.ts**: Contains tests for:
  - Searching "test automation" on Google
  - Verifying Google homepage elements
  - Taking screenshots of search results

## Technology Stack

- TypeScript
- Playwright Test Framework
- Cross-browser testing support

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Cookie consent handling
- Screenshot capture on test completion
- Automatic retries on failure
- HTML test reports
- Video recording on failure
