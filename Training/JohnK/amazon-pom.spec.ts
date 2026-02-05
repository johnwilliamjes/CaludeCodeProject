import { test, expect, Page } from '@playwright/test';

// Page Object Model for Amazon Pages

export class AmazonHomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.amazon.com');
  }

  async searchProduct(searchTerm: string) {
    await this.page.locator('#twotabsearchtextbox').fill(searchTerm);
    await this.page.locator('#nav-search-submit-button').click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickHamburgerMenu() {
    await this.page.locator('#nav-hamburger-menu').click();
  }

  async goToCart() {
    await this.page.locator('#nav-cart').click();
  }

  async goToSignIn() {
    await this.page.locator('#nav-link-accountList').click();
  }

  async isLogoVisible() {
    return await this.page.locator('#nav-logo-sprites, #nav-logo').isVisible({ timeout: 10000 });
  }

  async isSearchBoxVisible() {
    return await this.page.locator('#twotabsearchtextbox').isVisible();
  }
}

export class AmazonSearchPage {
  constructor(private page: Page) {}

  async sortBy(option: string) {
    const sortDropdown = this.page.locator('#s-result-sort-select');
    await sortDropdown.selectOption(option);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async applyBrandFilter(brandName: string) {
    const brandCheckbox = this.page.locator(`input[type="checkbox"][value="${brandName}"]`);
    await brandCheckbox.check();
  }

  async clickFirstProduct() {
    const firstProduct = this.page.locator('[data-component-type="s-search-result"] h2 a').first();
    await firstProduct.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getResultsCount() {
    return await this.page.locator('[data-component-type="s-search-result"]').count();
  }

  async isSearchResultsVisible() {
    const results = this.page.locator('[data-component-type="s-search-result"]').first();
    return await results.isVisible({ timeout: 10000 });
  }
}

export class AmazonProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    const addToCartButton = this.page.locator('#add-to-cart-button');
    if (await addToCartButton.isVisible({ timeout: 5000 })) {
      await addToCartButton.click();
      await this.page.waitForTimeout(2000);
      return true;
    }
    return false;
  }

  async getProductTitle() {
    const title = this.page.locator('#productTitle, #title');
    return await title.textContent();
  }

  async isPriceVisible() {
    const price = this.page.locator('.a-price .a-offscreen').first();
    return await price.isVisible({ timeout: 5000 });
  }

  async isAddToCartButtonVisible() {
    const button = this.page.locator('#add-to-cart-button');
    return await button.isVisible({ timeout: 5000 });
  }

  async clickThumbnailImage(index: number) {
    const thumbnails = this.page.locator('.imageThumbnail, #altImages li');
    await thumbnails.nth(index).click();
  }

  async getReviewCount() {
    const reviewCount = this.page.locator('#acrCustomerReviewText');
    return await reviewCount.textContent();
  }
}

export class AmazonCartPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.amazon.com/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCartItemsCount() {
    const items = this.page.locator('.sc-list-item');
    return await items.count();
  }

  async updateQuantity(itemIndex: number, quantity: string) {
    const quantitySelector = this.page.locator('select[name="quantity"]').nth(itemIndex);
    await quantitySelector.selectOption(quantity);
    await this.page.waitForTimeout(2000);
  }

  async removeItem(itemIndex: number) {
    const deleteButton = this.page.locator('input[value="Delete"]').nth(itemIndex);
    await deleteButton.click();
    await this.page.waitForTimeout(2000);
  }

  async isCartEmpty() {
    const emptyMessage = this.page.locator('.sc-your-amazon-cart-is-empty, h2:has-text("Your Amazon Cart is empty")');
    return await emptyMessage.isVisible({ timeout: 3000 });
  }

  async proceedToCheckout() {
    const checkoutButton = this.page.locator('input[name="proceedToRetailCheckout"], #sc-buy-box-ptc-button');
    if (await checkoutButton.isVisible({ timeout: 5000 })) {
      await checkoutButton.click();
      return true;
    }
    return false;
  }

  async getSubtotal() {
    const subtotal = this.page.locator('#sc-subtotal-amount-activecart .a-offscreen');
    return await subtotal.textContent();
  }
}

export class AmazonLoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.amazon.com/ap/signin');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterEmail(email: string) {
    await this.page.locator('#ap_email').fill(email);
  }

  async clickContinue() {
    await this.page.locator('#continue').click();
    await this.page.waitForTimeout(2000);
  }

  async enterPassword(password: string) {
    await this.page.locator('#ap_password').fill(password);
  }

  async clickSignIn() {
    await this.page.locator('#signInSubmit').click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isEmailFieldVisible() {
    return await this.page.locator('#ap_email').isVisible({ timeout: 10000 });
  }

  async isCreateAccountLinkVisible() {
    return await this.page.locator('#createAccountSubmit').isVisible();
  }
}

// Tests using Page Object Model

test.describe('Amazon Tests using POM', () => {
  test('POM: Search and Add Product to Cart', async ({ page }) => {
    const homePage = new AmazonHomePage(page);
    const searchPage = new AmazonSearchPage(page);
    const productPage = new AmazonProductPage(page);

    // Navigate and search
    await homePage.navigate();
    await homePage.searchProduct('wireless keyboard');

    // Verify results and click product
    expect(await searchPage.isSearchResultsVisible()).toBe(true);
    await searchPage.clickFirstProduct();

    // Add to cart
    const added = await productPage.addToCart();
    if (added) {
      console.log('Product successfully added to cart');
    }
  });

  test('POM: Verify Cart Operations', async ({ page }) => {
    const cartPage = new AmazonCartPage(page);

    await cartPage.navigate();
    
    const itemCount = await cartPage.getCartItemsCount();
    console.log(`Cart has ${itemCount} items`);

    if (itemCount > 0) {
      const subtotal = await cartPage.getSubtotal();
      console.log(`Cart subtotal: ${subtotal}`);
    } else {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
    }
  });

  test('POM: Login Page Verification', async ({ page }) => {
    const loginPage = new AmazonLoginPage(page);

    await loginPage.navigate();
    
    expect(await loginPage.isEmailFieldVisible()).toBe(true);
    expect(await loginPage.isCreateAccountLinkVisible()).toBe(true);

    console.log('Login page elements verified using POM');
  });

  test('POM: Sort and Filter Products', async ({ page }) => {
    const homePage = new AmazonHomePage(page);
    const searchPage = new AmazonSearchPage(page);

    await homePage.navigate();
    await homePage.searchProduct('monitor');

    // Sort by price
    await searchPage.sortBy('price-asc-rank');
    
    const resultsCount = await searchPage.getResultsCount();
    console.log(`Found ${resultsCount} results after sorting`);
  });

  test('POM: Verify Homepage Elements', async ({ page }) => {
    const homePage = new AmazonHomePage(page);

    await homePage.navigate();
    
    expect(await homePage.isLogoVisible()).toBe(true);
    expect(await homePage.isSearchBoxVisible()).toBe(true);

    console.log('Homepage elements verified successfully');
    });

    test('POM: Navigate to Cart from Homepage', async ({ page }) => {
    const homePage = new AmazonHomePage(page);
    const cartPage = new AmazonCartPage(page);

    await homePage.navigate();
    await homePage.goToCart();
    
    await page.waitForLoadState('domcontentloaded');
    const isEmpty = await cartPage.isCartEmpty();
    console.log(`Cart is empty: ${isEmpty}`);
    });
});
