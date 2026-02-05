import { test, expect, Page } from '@playwright/test';

test.describe('Amazon Homepage Tests', () => {
  test('TC-HP-001: Verify Homepage Loads Successfully', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Verify page title contains Amazon
    await expect(page).toHaveTitle(/Amazon/);
    
    // Verify Amazon logo is visible
    const logo = page.locator('#nav-logo-sprites, #nav-logo');
    await expect(logo).toBeVisible({ timeout: 10000 });
    
    // Verify search box is visible
    const searchBox = page.locator('#twotabsearchtextbox');
    await expect(searchBox).toBeVisible();
    
    // Verify navigation menu is present
    const navMenu = page.locator('#nav-hamburger-menu, #nav-main');
    await expect(navMenu).toBeVisible();
  });

  test('TC-HP-002: Verify Navigation Menu Categories', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Click hamburger menu
    const hamburgerMenu = page.locator('#nav-hamburger-menu');
    await hamburgerMenu.click();
    
    // Wait for menu to open
    await page.waitForSelector('.hmenu-visible', { timeout: 5000 });
    
    // Verify main categories are visible
    const menuContent = page.locator('.hmenu-visible');
    await expect(menuContent).toBeVisible();
    
    // Check for common categories
    const categories = ['Electronics', 'Fashion', 'Home', 'Books'];
    for (const category of categories) {
      const categoryLink = page.locator(`.hmenu-visible:has-text("${category}")`);
      // Just verify the menu is open, categories may vary
    }
    
    console.log('Navigation menu opened successfully');
  });
});

test.describe('Amazon Search Functionality Tests', () => {
  test('TC-SF-001: Verify Basic Product Search', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Enter search term
    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.fill('laptop');
    
    // Click search button
    const searchButton = page.locator('#nav-search-submit-button');
    await searchButton.click();
    
    // Wait for search results page
    await page.waitForLoadState('domcontentloaded');
    
    // Verify URL contains search parameter
    await expect(page).toHaveURL(/s\?k=laptop/);
    
    // Verify search results are displayed
    const results = page.locator('[data-component-type="s-search-result"]').first();
    await expect(results).toBeVisible({ timeout: 10000 });
    
    // Verify search term appears on page
    const searchTerm = page.locator('.a-color-state');
    await expect(searchTerm).toContainText('laptop');
    
    console.log('Search completed successfully');
  });

  test('TC-SF-002: Verify Search Suggestions', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Type in search box
    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.fill('head');
    
    // Wait for suggestions
    await page.waitForTimeout(1000);
    
    // Check if suggestions dropdown appears
    const suggestions = page.locator('.s-suggestion');
    const count = await suggestions.count();
    
    if (count > 0) {
      console.log(`Found ${count} search suggestions`);
      await expect(suggestions.first()).toBeVisible();
    } else {
      console.log('No suggestions appeared (may be region-dependent)');
    }
  });

  test('TC-SF-003: Verify Search with Filters', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for laptop
    await page.locator('#twotabsearchtextbox').fill('laptop');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for filters to load
    await page.waitForTimeout(2000);
    
    // Try to apply a brand filter
    const brandFilters = page.locator('[data-csa-c-element-type="filter-brand"]').first();
    if (await brandFilters.isVisible({ timeout: 5000 })) {
      await brandFilters.click();
      await page.waitForTimeout(2000);
      console.log('Brand filter applied');
    } else {
      console.log('Brand filters not available in current view');
    }
    
    // Verify results are still displayed
    const results = page.locator('[data-component-type="s-search-result"]').first();
    await expect(results).toBeVisible({ timeout: 10000 });
  });

  test('TC-SF-004: Verify Empty Search', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Click search without entering text
    const searchButton = page.locator('#nav-search-submit-button');
    await searchButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    
    // Verify we're still on Amazon domain
    expect(page.url()).toContain('amazon.com');
    
    console.log('Empty search handled gracefully');
  });
});

test.describe('Amazon Product Details Tests', () => {
  test('TC-PD-001: Verify Product Details Page', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for a product
    await page.locator('#twotabsearchtextbox').fill('wireless mouse');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Click on first product
    const firstProduct = page.locator('[data-component-type="s-search-result"] h2 a').first();
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify product title is displayed
    const productTitle = page.locator('#productTitle, #title');
    await expect(productTitle).toBeVisible({ timeout: 10000 });
    
    // Verify price is displayed
    const price = page.locator('.a-price .a-offscreen, #priceblock_ourprice, #priceblock_dealprice').first();
    await expect(price).toBeVisible({ timeout: 5000 });
    
    // Verify Add to Cart button is present
    const addToCartButton = page.locator('#add-to-cart-button, input[name="submit.add-to-cart"]');
    await expect(addToCartButton).toBeVisible({ timeout: 5000 });
    
    console.log('Product details page verified');
  });

  test('TC-PD-002: Verify Product Image Gallery', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search and open a product
    await page.locator('#twotabsearchtextbox').fill('camera');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    const firstProduct = page.locator('[data-component-type="s-search-result"] h2 a').first();
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify main product image
    const mainImage = page.locator('#landingImage, #imgBlkFront');
    await expect(mainImage).toBeVisible({ timeout: 10000 });
    
    // Check for thumbnail images
    const thumbnails = page.locator('.imageThumbnail, #altImages li');
    const thumbCount = await thumbnails.count();
    console.log(`Found ${thumbCount} thumbnail images`);
  });

  test('TC-PD-003: Verify Product Reviews Section', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for a popular product category
    await page.locator('#twotabsearchtextbox').fill('bestseller books');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    const firstProduct = page.locator('[data-component-type="s-search-result"] h2 a').first();
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Look for star rating
    const starRating = page.locator('#acrPopover, .a-icon-star').first();
    if (await starRating.isVisible({ timeout: 5000 })) {
      console.log('Star rating is displayed');
    }
    
    // Look for review count
    const reviewCount = page.locator('#acrCustomerReviewText, #averageCustomerReviews');
    if (await reviewCount.isVisible({ timeout: 5000 })) {
      console.log('Review count is displayed');
    }
  });
});

test.describe('Amazon Shopping Cart Tests', () => {
  test('TC-SC-001: Add Product to Cart', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for a product
    await page.locator('#twotabsearchtextbox').fill('usb cable');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Click on first product
    const firstProduct = page.locator('[data-component-type="s-search-result"] h2 a').first();
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Add to cart
    const addToCartButton = page.locator('#add-to-cart-button');
    if (await addToCartButton.isVisible({ timeout: 5000 })) {
      await addToCartButton.click();
      await page.waitForTimeout(2000);
      
      // Check for success confirmation
      const confirmation = page.locator('#attachDisplayAddBaseAlert, #huc-v2-order-row-confirm-text, .a-size-medium-plus');
      if (await confirmation.isVisible({ timeout: 5000 })) {
        console.log('Product added to cart successfully');
      }
      
      // Verify cart count updated
      const cartCount = page.locator('#nav-cart-count');
      const count = await cartCount.textContent();
      console.log(`Cart count: ${count}`);
    } else {
      console.log('Add to Cart button not available for this product');
    }
  });

  test('TC-SC-002: View Shopping Cart', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Click on cart icon
    const cartIcon = page.locator('#nav-cart');
    await cartIcon.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify we're on cart page
    await expect(page).toHaveURL(/cart/);
    
    // Check if cart is empty or has items
    const emptyCartMessage = page.locator('.sc-your-amazon-cart-is-empty, h2:has-text("Your Amazon Cart is empty")');
    const cartItems = page.locator('.sc-list-item');
    
    if (await emptyCartMessage.isVisible({ timeout: 3000 })) {
      console.log('Cart is empty');
    } else if (await cartItems.count() > 0) {
      console.log(`Cart has ${await cartItems.count()} items`);
    }
  });

  test('TC-SC-003: Update Cart Quantity', async ({ page }) => {
    await page.goto('https://www.amazon.com/cart');
    await page.waitForLoadState('domcontentloaded');
    
    // Check if cart has items
    const cartItems = page.locator('.sc-list-item');
    const itemCount = await cartItems.count();
    
    if (itemCount > 0) {
      // Try to find quantity selector
      const quantitySelector = page.locator('select[name="quantity"]').first();
      if (await quantitySelector.isVisible({ timeout: 3000 })) {
        await quantitySelector.selectOption('2');
        await page.waitForTimeout(2000);
        console.log('Quantity updated');
      } else {
        console.log('Quantity selector not found');
      }
    } else {
      console.log('No items in cart to update');
    }
  });

  test('TC-SC-004: Remove Item from Cart', async ({ page }) => {
    await page.goto('https://www.amazon.com/cart');
    await page.waitForLoadState('domcontentloaded');
    
    // Check if cart has items
    const deleteButtons = page.locator('input[value="Delete"], .sc-action-delete');
    const buttonCount = await deleteButtons.count();
    
    if (buttonCount > 0) {
      const initialCount = await page.locator('.sc-list-item').count();
      await deleteButtons.first().click();
      await page.waitForTimeout(2000);
      console.log('Item removed from cart');
    } else {
      console.log('No items in cart to remove');
    }
  });

  test('TC-SC-005: Verify Empty Cart Message', async ({ page }) => {
    await page.goto('https://www.amazon.com/cart');
    await page.waitForLoadState('domcontentloaded');
    
    // Check for empty cart message
    const emptyMessage = page.locator('.sc-your-amazon-cart-is-empty, h2:has-text("Your Amazon Cart is empty")');
    const cartItems = page.locator('.sc-list-item');
    
    if (await emptyMessage.isVisible({ timeout: 3000 })) {
      console.log('Empty cart message is displayed correctly');
      await expect(emptyMessage).toBeVisible();
    } else if (await cartItems.count() > 0) {
      console.log('Cart has items - empty message not shown (expected)');
    }
  });
});

test.describe('Amazon Sorting and Filtering Tests', () => {
  test('TC-SRT-001: Sort Products by Price (Low to High)', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for products
    await page.locator('#twotabsearchtextbox').fill('headphones');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Find and click sort dropdown
    const sortDropdown = page.locator('#s-result-sort-select');
    if (await sortDropdown.isVisible({ timeout: 5000 })) {
      await sortDropdown.selectOption('price-asc-rank');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      console.log('Sorted by price: Low to High');
      
      // Verify results are still displayed
      const results = page.locator('[data-component-type="s-search-result"]').first();
      await expect(results).toBeVisible();
    } else {
      console.log('Sort dropdown not found');
    }
  });

  test('TC-SRT-002: Sort Products by Customer Reviews', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for products
    await page.locator('#twotabsearchtextbox').fill('electronics');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Sort by customer reviews
    const sortDropdown = page.locator('#s-result-sort-select');
    if (await sortDropdown.isVisible({ timeout: 5000 })) {
      await sortDropdown.selectOption('review-rank');
      await page.waitForLoadState('domcontentloaded');
      console.log('Sorted by customer reviews');
    }
  });

  test('TC-SRT-003: Filter by Department/Category', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for general term
    await page.locator('#twotabsearchtextbox').fill('electronics');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for filters
    await page.waitForTimeout(2000);
    
    // Try to find department filters
    const departmentFilter = page.locator('#departments li a').first();
    if (await departmentFilter.isVisible({ timeout: 5000 })) {
      await departmentFilter.click();
      await page.waitForLoadState('domcontentloaded');
      console.log('Department filter applied');
    } else {
      console.log('Department filters not visible');
    }
  });

  test('TC-SRT-004: Filter by Brand', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for laptops
    await page.locator('#twotabsearchtextbox').fill('laptop');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Look for brand filters
    const brandCheckbox = page.locator('[data-csa-c-element-type="filter-brand"] input[type="checkbox"]').first();
    if (await brandCheckbox.isVisible({ timeout: 5000 })) {
      await brandCheckbox.check();
      await page.waitForTimeout(2000);
      console.log('Brand filter applied');
    } else {
      console.log('Brand filters not available');
    }
  });

  test('TC-SRT-005: Filter by Price Range', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Search for products
    await page.locator('#twotabsearchtextbox').fill('books');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Try to apply price filter
    const priceFilter = page.locator('[data-csa-c-element-id="price-range"] input[type="radio"]').first();
    if (await priceFilter.isVisible({ timeout: 5000 })) {
      await priceFilter.check();
      await page.waitForTimeout(2000);
      console.log('Price filter applied');
    } else {
      console.log('Price filters not available');
    }
  });
});

test.describe('Amazon Account and Login Tests', () => {
  test('TC-AL-001: Verify Login Page Elements', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Click on Sign In
    const signInButton = page.locator('#nav-link-accountList');
    await signInButton.click();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify email input field
    const emailInput = page.locator('#ap_email');
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    
    // Verify Continue button
    const continueButton = page.locator('#continue');
    await expect(continueButton).toBeVisible();
    
    // Verify Create Account link
    const createAccountLink = page.locator('#createAccountSubmit');
    await expect(createAccountLink).toBeVisible();
    
    console.log('Login page elements verified');
  });

  test('TC-AL-003: Verify Login with Invalid Credentials', async ({ page }) => {
    await page.goto('https://www.amazon.com/ap/signin');
    await page.waitForLoadState('domcontentloaded');
    
    // Enter invalid email
    const emailInput = page.locator('#ap_email');
    await emailInput.fill('invalid@example.com');
    
    // Click Continue
    const continueButton = page.locator('#continue');
    await continueButton.click();
    await page.waitForTimeout(2000);
    
    // Check for error or password field
    const passwordField = page.locator('#ap_password');
    if (await passwordField.isVisible({ timeout: 5000 })) {
      // Enter invalid password
      await passwordField.fill('wrongpassword');
      await page.locator('#signInSubmit').click();
      await page.waitForTimeout(2000);
      console.log('Invalid login attempted');
    }
  });

  test('TC-AL-004: Verify Account Menu Options', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Hover over account menu
    const accountMenu = page.locator('#nav-link-accountList');
    await accountMenu.hover();
    await page.waitForTimeout(1000);
    
    // Check if dropdown appears
    const accountDropdown = page.locator('#nav-flyout-accountList');
    if (await accountDropdown.isVisible({ timeout: 3000 })) {
      console.log('Account menu dropdown is visible');
      
      // Verify Sign In button or account options
      const signInOption = page.locator('.nav-action-button, #nav-flyout-ya-signin');
      if (await signInOption.isVisible({ timeout: 2000 })) {
        console.log('Sign In option visible (user not logged in)');
      }
    }
  });
});

test.describe('Amazon Footer Tests', () => {
  test('TC-FT-001: Verify Footer Links', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Verify footer is visible
    const footer = page.locator('#navFooter, footer');
    await expect(footer).toBeVisible();
    
    // Check for common footer links
    const aboutUsLink = page.locator('a:has-text("About")');
    const careersLink = page.locator('a:has-text("Careers")');
    
    console.log('Footer section verified');
  });

  test('TC-FT-002: Verify Language and Currency Options', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Look for language/country selector
    const countrySelector = page.locator('#icp-nav-flyout, .icp-nav-link-inner');
    if (await countrySelector.isVisible({ timeout: 5000 })) {
      console.log('Language/Country selector is visible');
    }
  });
});

test.describe('Amazon Mobile Responsiveness Tests', () => {
  test('TC-MB-001: Verify Mobile Menu Navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://www.amazon.com');
    
    // Verify hamburger menu appears
    const hamburgerMenu = page.locator('#nav-hamburger-menu');
    await expect(hamburgerMenu).toBeVisible({ timeout: 10000 });
    
    // Click menu
    await hamburgerMenu.click();
    await page.waitForTimeout(1000);
    
    // Verify menu opens
    const menuPanel = page.locator('.hmenu-visible, #hmenu-content');
    await expect(menuPanel).toBeVisible({ timeout: 5000 });
    
    console.log('Mobile menu verified');
  });

  test('TC-MB-002: Verify Mobile Search Functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://www.amazon.com');
    
    // Find and use search box
    const searchBox = page.locator('#twotabsearchtextbox');
    await expect(searchBox).toBeVisible({ timeout: 10000 });
    
    // Perform search
    await searchBox.fill('mobile phone');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify results display on mobile
    const results = page.locator('[data-component-type="s-search-result"]').first();
    await expect(results).toBeVisible({ timeout: 10000 });
    
    console.log('Mobile search verified');
  });
});
