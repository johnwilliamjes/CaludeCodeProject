# Amazon Application Test Cases for Playwright Automation

## Test Suite Overview
This document contains feasible test cases for Amazon.com that can be automated using Playwright.

- Implementation: test logic and suites live in `amazon-tests.spec.ts` (functional tests) and `amazon-pom.spec.ts` (POM helpers and example tests).

---

## Prerequisites
- Node.js 20+ installed
- Install project dependencies: `npm ci`
- Install Playwright browsers and dependencies: `npx playwright install` (add to CI before running tests)
- Ensure test accounts are available for authentication-required tests and store credentials securely as environment variables or use Playwright `storageState` for session reuse

---

## 1. Homepage Test Cases

### TC-HP-001: Verify Homepage Loads Successfully
**Priority:** High  
**Description:** Verify that the Amazon homepage loads with all essential elements  
**Preconditions:** Browser is open  
**Test Steps:**
1. Navigate to https://www.amazon.com
2. Verify page title contains "Amazon"
3. Verify Amazon logo is visible
4. Verify search box is visible
5. Verify navigation menu is present

**Expected Result:** All homepage elements load successfully

---

### TC-HP-002: Verify Navigation Menu Categories
**Priority:** Medium  
**Description:** Verify that main navigation categories are displayed  
**Test Steps:**
1. Navigate to Amazon homepage
2. Click on "All" menu (hamburger menu)
3. Verify category list is displayed
4. Verify categories include: Electronics, Fashion, Home, Books, etc.

**Expected Result:** All main categories are visible and clickable

---

## 2. Search Functionality Test Cases

### TC-SF-001: Verify Basic Product Search
**Priority:** High  
**Description:** Search for a product and verify results are displayed  
**Test Steps:**
1. Navigate to Amazon homepage
2. Enter "laptop" in search box
3. Click search button or press Enter
4. Verify search results page loads
5. Verify product listings are displayed
6. Verify search term appears in the results page

**Expected Result:** Relevant search results are displayed

---

### TC-SF-002: Verify Search Suggestions
**Priority:** Medium  
**Description:** Verify autocomplete suggestions appear during search  
**Test Steps:**
1. Navigate to Amazon homepage
2. Type "head" in search box (do not submit)
3. Wait for suggestions dropdown
4. Verify suggestions contain relevant items (e.g., "headphones", "headset")

**Expected Result:** Autocomplete suggestions appear and are relevant

---

### TC-SF-003: Verify Search with Filters
**Priority:** High  
**Description:** Apply filters to search results  
**Test Steps:**
1. Search for "laptop"
2. Wait for results page to load
3. Apply brand filter (e.g., "Dell")
4. Apply price range filter
5. Verify filtered results match selected criteria

**Expected Result:** Results are filtered according to selected options

---

### TC-SF-004: Verify Empty Search
**Priority:** Low  
**Description:** Verify behavior when submitting empty search  
**Test Steps:**
1. Navigate to Amazon homepage
2. Click search button without entering text
3. Verify appropriate message or behavior

**Expected Result:** System handles empty search gracefully

---

## 3. Product Details Test Cases

### TC-PD-001: Verify Product Details Page
**Priority:** High  
**Description:** Open a product and verify all details are displayed  
**Test Steps:**
1. Search for "wireless mouse"
2. Click on first product from results
3. Verify product title is displayed
4. Verify product price is displayed
5. Verify product images are displayed
6. Verify "Add to Cart" button is present
7. Verify product description section exists

**Expected Result:** All product details are properly displayed

---

### TC-PD-002: Verify Product Image Gallery
**Priority:** Medium  
**Description:** Verify product image gallery functionality  
**Test Steps:**
1. Open any product details page
2. Verify main product image is displayed
3. Click on thumbnail images
4. Verify main image changes accordingly
5. Hover over main image to zoom (if available)

**Expected Result:** Image gallery functions correctly

---

### TC-PD-003: Verify Product Reviews Section
**Priority:** Medium  
**Description:** Verify customer reviews are displayed  
**Test Steps:**
1. Open a product with reviews
2. Scroll to customer reviews section
3. Verify star rating is displayed
4. Verify review count is shown
5. Verify individual reviews are listed

**Expected Result:** Reviews section displays properly

---

## 4. Shopping Cart Test Cases

### TC-SC-001: Add Product to Cart
**Priority:** High  
**Description:** Add a product to shopping cart  
**Test Steps:**
1. Search for "book"
2. Select a product
3. Click "Add to Cart" button
4. Verify success message appears
5. Verify cart icon updates with item count

**Expected Result:** Product is successfully added to cart

---

### TC-SC-002: View Shopping Cart
**Priority:** High  
**Description:** View items in shopping cart  
**Test Steps:**
1. Add at least one item to cart
2. Click on cart icon
3. Verify cart page displays
4. Verify product details are shown (name, price, quantity)
5. Verify subtotal is calculated correctly

**Expected Result:** Cart displays all added items with correct details

---

### TC-SC-003: Update Cart Quantity
**Priority:** High  
**Description:** Change quantity of items in cart  
**Test Steps:**
1. Add a product to cart
2. Navigate to cart page
3. Change quantity using dropdown or input field
4. Verify subtotal updates accordingly

**Expected Result:** Quantity changes and price updates correctly

---

### TC-SC-004: Remove Item from Cart
**Priority:** High  
**Description:** Delete an item from shopping cart  
**Test Steps:**
1. Add multiple items to cart
2. Navigate to cart page
3. Click "Delete" or "Remove" on one item
4. Verify item is removed from cart
5. Verify cart total updates

**Expected Result:** Item is removed and totals are recalculated

---

### TC-SC-005: Verify Empty Cart Message
**Priority:** Low  
**Description:** Verify message when cart is empty  
**Test Steps:**
1. Navigate to cart with no items (or remove all items)
2. Verify "Your cart is empty" message is displayed
3. Verify continue shopping link/button is present

**Expected Result:** Appropriate empty cart message is shown

---

## 5. Account and Login Test Cases

### TC-AL-001: Verify Login Page Elements
**Priority:** High  
**Description:** Verify login page displays correctly  
**Test Steps:**
1. Navigate to Amazon homepage
2. Click on "Sign In" or account menu
3. Verify email/phone input field is displayed
4. Verify "Continue" button is present
5. Verify "Create your Amazon account" link is present

**Expected Result:** All login page elements are displayed

---

### TC-AL-002: Verify Login with Valid Credentials
**Priority:** High  
**Description:** Login with valid user credentials  
**Preconditions:** Valid test account credentials available  
**Test Steps:**
1. Navigate to login page
2. Enter valid email/phone
3. Click Continue
4. Enter valid password
5. Click "Sign In"
6. Verify successful login (user name appears in header)

**Expected Result:** User successfully logs in

---

### TC-AL-003: Verify Login with Invalid Credentials
**Priority:** Medium  
**Description:** Attempt login with invalid credentials  
**Test Steps:**
1. Navigate to login page
2. Enter invalid email
3. Click Continue
4. Verify error message is displayed

**Expected Result:** Appropriate error message shown

---

### TC-AL-004: Verify Account Menu Options
**Priority:** Medium  
**Description:** Verify logged-in user menu options  
**Preconditions:** User is logged in  
**Test Steps:**
1. Hover over or click account menu
2. Verify "Your Orders" option is present
3. Verify "Your Lists" option is present
4. Verify "Your Account" option is present
5. Verify "Sign Out" option is present

**Expected Result:** All menu options are accessible

---

## 6. Sorting and Filtering Test Cases

### TC-SRT-001: Sort Products by Price (Low to High)
**Priority:** High  
**Description:** Sort search results by price  
**Test Steps:**
1. Search for any product category
2. Locate sort dropdown
3. Select "Price: Low to High"
4. Verify results are sorted by ascending price

**Expected Result:** Products display in low to high price order

---

### TC-SRT-002: Sort Products by Customer Reviews
**Priority:** Medium  
**Description:** Sort by customer rating  
**Test Steps:**
1. Search for any product
2. Select "Avg. Customer Review" from sort options
3. Verify products with higher ratings appear first

**Expected Result:** Products sorted by review rating

---

### TC-SRT-003: Filter by Department/Category
**Priority:** High  
**Description:** Apply category filter to narrow results  
**Test Steps:**
1. Search for "electronics"
2. Select specific category from left sidebar (e.g., "Computers & Accessories")
3. Verify results update to show only selected category

**Expected Result:** Results filtered to selected category

---

### TC-SRT-004: Filter by Brand
**Priority:** High  
**Description:** Filter search results by brand  
**Test Steps:**
1. Search for product category
2. Select one or more brands from filter sidebar
3. Verify only products from selected brands are displayed

**Expected Result:** Results show only selected brands

---

### TC-SRT-005: Filter by Price Range
**Priority:** Medium  
**Description:** Apply price range filter  
**Test Steps:**
1. Search for products
2. Select a price range (e.g., $25 to $50)
3. Verify all displayed products fall within range

**Expected Result:** Products within selected price range shown

---

## 7. Wishlist Test Cases
> **Note:** Wishlist tests require an authenticated user. Use `storageState` or a dedicated test account and ensure tests clean up any added items.

### TC-WL-001: Add Product to Wishlist
**Priority:** Medium  
**Description:** Add item to wishlist/shopping list  
**Preconditions:** User is logged in  
**Test Steps:**
1. Navigate to any product page
2. Click "Add to List" or heart icon
3. Select or create a list
4. Verify confirmation message

**Expected Result:** Product added to wishlist

---

### TC-WL-002: View Wishlist Items
**Priority:** Medium  
**Description:** View all items in wishlist  
**Preconditions:** At least one item in wishlist  
**Test Steps:**
1. Navigate to "Your Lists" from account menu
2. Select wishlist
3. Verify all added items are displayed

**Expected Result:** Wishlist displays all saved items

---

### TC-WL-003: Remove Item from Wishlist
**Priority:** Low  
**Description:** Delete item from wishlist  
**Test Steps:**
1. Open wishlist
2. Click delete/remove on an item
3. Verify item is removed from list

**Expected Result:** Item successfully removed

---

## 8. Checkout Process Test Cases (Read-Only Tests)

### TC-CO-001: Verify Proceed to Checkout Button
**Priority:** High  
**Description:** Verify checkout button is accessible  
**Test Steps:**
1. Add items to cart
2. Navigate to cart page
3. Verify "Proceed to Checkout" button is visible and enabled

**Expected Result:** Checkout button is available

---

### TC-CO-002: Verify Checkout Login Requirement
**Priority:** Medium  
**Description:** Verify checkout requires login  
**Test Steps:**
1. Add item to cart (while logged out)
2. Click "Proceed to Checkout"
3. Verify login page appears

**Expected Result:** User prompted to sign in

---

## 9. Footer and Help Section Test Cases

### TC-FT-001: Verify Footer Links
**Priority:** Low  
**Description:** Verify footer contains important links  
**Test Steps:**
1. Scroll to page footer
2. Verify presence of links: About Us, Careers, Help, Customer Service
3. Click on "Help" link
4. Verify help page loads

**Expected Result:** Footer links are present and functional

---

### TC-FT-002: Verify Language and Currency Options
**Priority:** Low  
**Description:** Verify language/currency selector  
**Test Steps:**
1. Scroll to footer
2. Locate language/country selector
3. Verify current language/country is displayed

**Expected Result:** Language/country options are accessible

---

## 10. Mobile Responsiveness Test Cases

### TC-MB-001: Verify Mobile Menu Navigation
**Priority:** Medium  
**Description:** Test navigation on mobile viewport  
**Test Steps:**
1. Set viewport to mobile size (e.g., 375x667)
2. Verify hamburger menu appears
3. Click menu icon
4. Verify navigation menu opens

**Expected Result:** Mobile menu functions correctly

---

### TC-MB-002: Verify Mobile Search Functionality
**Priority:** High  
**Description:** Test search on mobile viewport  
**Test Steps:**
1. Set viewport to mobile size
2. Locate and click search icon/box
3. Enter search term
4. Verify results display properly on mobile

**Expected Result:** Search works on mobile view

---

## Execution

### How to run locally
- Run entire suite: `npm test` or `npx playwright test`
- Run a specific file: `npx playwright test amazon-tests.spec.ts` or `npm test -- amazon-tests.spec.ts`
- Run a single test by title (grep): `npx playwright test -g "TC-SC-001"` or `npm test -- -g "TC-SC-001"`
- Run in headed mode: `npx playwright test --headed`
- Run a specific browser/project: `npx playwright test --project=chromium`

### Recommended npm scripts (add to `package.json`)
```json
"scripts": {
  "test": "playwright test",
  "test:amazon": "playwright test amazon-tests.spec.ts",
  "test:pom": "playwright test amazon-pom.spec.ts",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "report": "playwright show-report"
}
```

### CI Notes
- Always run `npx playwright install` (and `npx playwright install-deps` on Linux) before executing tests.
- Example GitHub Actions steps:
```yaml
- uses: actions/checkout@v4
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 20
- run: npm ci
- run: npx playwright install --with-deps
- run: npm test -- --reporter=html
  env:
    CI: true
```

## Implementation Notes for Playwright

### Authentication Handling
- Use stored authentication state for tests requiring login
- Create separate authenticated and non-authenticated test suites
- Store credentials in environment variables

### Best Practices
1. Use explicit waits for dynamic content.
2. Implement retry logic for flaky network requests.
3. Take screenshots on test failures and attach traces when needed.
4. Use data-driven testing for multiple product searches.
5. Implement robust selectors: prefer `data-testid`/data attributes, IDs, or ARIA/role-based selectors over brittle CSS classes. Example: `#twotabsearchtextbox`, `data-testid="product-card"`, `role=button[name="Add to Cart"]`.
6. Add fallback selectors where appropriate and wrap locator lookups with visibility checks before acting.
7. Handle cookie consent popups and common overlays centrally in fixtures for reusability.
8. Use fixtures for setup/teardown and `storageState` for authenticated sessions.
9. Implement Page Object Model for maintainability and reuse.

### Limitations
- Avoid actual purchase transactions in automated tests.
- Use test accounts only.
- Respect Amazon's robots.txt and terms of service.
- Implement rate limiting to avoid overwhelming servers; add delays between high-volume runs and stagger parallel jobs.
- Be aware of CAPTCHA challenges for aggressive automation. Mitigations: reduce run frequency, use dedicated test accounts/IPs, add human-in-the-loop gating for captcha-prone flows, or mark those flows as manual or gated in CI.

### Test Data
- Use generic search terms that consistently return results
- Maintain test data separate from scripts
- Use product ASINs for reliable product identification

---

## Test Execution Priority

**P0 - Critical (Must Run)**
- Homepage load
- Basic search
- Add to cart
- View cart

**P1 - High Priority**
- Product details
- Filters and sorting
- Cart operations
- Login functionality

**P2 - Medium Priority**
- Wishlist operations
- Account menu
- Reviews section

**P3 - Low Priority**
- Footer links
- Empty states
- Mobile responsiveness

---

## Test Environment
- **Website:** https://www.amazon.com
- **Browsers:** Chrome, Edge
- **Test Framework:** Playwright with TypeScript
- **Report:** HTML Report

---

*Document Version: 1.0*  
*Last Updated: January 16, 2026*
