# Amazon Playwright Test Suite

This directory contains comprehensive Playwright automation tests for Amazon.com based on the test cases documented in `Amazon-Test-Cases.md`.

## Test Files

### 1. amazon-tests.spec.ts
Main test suite containing all functional test cases organized by feature:
- Homepage Tests (2 test cases)
- Search Functionality Tests (4 test cases)
- Product Details Tests (3 test cases)
- Shopping Cart Tests (5 test cases)
- Sorting and Filtering Tests (5 test cases)
- Account and Login Tests (3 test cases)
- Footer Tests (2 test cases)
- Mobile Responsiveness Tests (2 test cases)

**Total: 26 automated test cases**

### 2. amazon-pom.spec.ts
Page Object Model (POM) implementation with reusable page classes:
- `AmazonHomePage` - Homepage interactions
- `AmazonSearchPage` - Search and filter operations
- `AmazonProductPage` - Product details operations
- `AmazonCartPage` - Cart management
- `AmazonLoginPage` - Login operations

**Includes 6 example tests using POM pattern (see `amazon-pom.spec.ts`)**

## Running the Tests

> Prerequisite: install Playwright browsers before running tests: `npx playwright install`

### Run all Amazon tests
```bash
# Recommended: pass filename using -- so arguments are forwarded to Playwright
npm test -- amazon-tests.spec.ts
# Or run directly with npx
npx playwright test amazon-tests.spec.ts
```

### Run POM tests
```bash
npm test -- amazon-pom.spec.ts
# Or run directly with npx
npx playwright test amazon-pom.spec.ts
```

### Run specific test suite
```bash
npm test -- --grep "Shopping Cart"
```

### Run in headed mode (see browser)
```bash
npm test -- --headed amazon-tests.spec.ts
```

### Run in debug mode
```bash
npm test -- --debug amazon-tests.spec.ts
```

### Run specific browser only
```bash
npm test -- --project=chromium amazon-tests.spec.ts
```

### View test report
```bash
npx playwright show-report
```

## Test Coverage

### High Priority (P0-P1)
✅ Homepage loading and elements  
✅ Basic product search  
✅ Search with filters  
✅ Product details display  
✅ Add to cart  
✅ View cart  
✅ Update cart quantity  
✅ Remove from cart  
✅ Sort products  
✅ Apply filters  
✅ Login page verification  

### Medium Priority (P2)
✅ Search suggestions  
✅ Product image gallery  
✅ Product reviews section  
✅ Empty cart verification  
✅ Account menu options  
✅ Footer links  
✅ Mobile menu navigation  
✅ Mobile search  

## Important Notes

### Authentication
- Tests do NOT use actual login credentials
- Login tests only verify UI elements
- For authenticated tests, use environment variables for credentials
- Consider using `storageState` for session persistence

### Test Data
- Tests use generic search terms
- No hardcoded product ASINs
- Tests handle dynamic content gracefully
- Empty cart scenarios are handled

### Amazon-Specific Considerations
1. **Rate Limiting**: Tests include appropriate waits to avoid overwhelming servers
2. **CAPTCHA**: May appear with aggressive automation. Mitigations: reduce test frequency, stagger parallel jobs, use dedicated test accounts/IP ranges, add human-in-the-loop gating for captcha-prone flows, or mark those flows as manual in CI.
3. **Regional Differences**: Amazon.com structure may vary by region
4. **Dynamic Content**: Product availability and prices change frequently
5. **Session State**: Cart may persist across tests
6. **No Purchases**: Tests stop before actual purchase transactions

### Selectors Used
- ID selectors (most reliable): `#twotabsearchtextbox`, `#nav-cart`
- Data attributes: `[data-component-type="s-search-result"]`
- Class selectors: `.sc-list-item`, `.a-price`
- Fallback selectors for different page variations

## Test Limitations

### What is NOT Tested
❌ Actual login with credentials (requires test account)  
❌ Complete checkout process (stops at proceed to checkout)  
❌ Payment information entry  
❌ Order placement  
❌ Account creation with email verification  
❌ Wishlist operations (requires authentication)  
❌ Prime membership features  
❌ Subscribe & Save features  

### Why These Limitations
- Avoid creating real orders
- Respect Amazon's Terms of Service
- Prevent financial transactions in automation
- Avoid email verification requirements

## Maintenance Tips

### Updating Selectors
If tests fail due to UI changes:
1. Inspect the element in browser DevTools
2. Update the selector in the test file
3. Prefer stable selectors (ID > data attributes > classes)
4. Add multiple fallback selectors when possible

### Handling Flaky Tests
- Increase timeout values if needed
- Add explicit waits for dynamic content
- Check for loading indicators
- Handle popups and overlays
- Consider retry logic for known flaky scenarios

### Adding New Tests
1. Document test case in `Amazon-Test-Cases.md`
2. Implement test in `amazon-tests.spec.ts`
3. Create page methods in `amazon-pom.spec.ts` if needed
4. Update this README with test count

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Amazon Tests
  run: npm test amazon-tests.spec.ts
  env:
    CI: true
```

### Azure DevOps Example
```yaml
- script: npm test amazon-tests.spec.ts
  displayName: 'Run Amazon Playwright Tests'
```

## Troubleshooting

### Common Issues

**Issue**: Tests timeout waiting for elements  
**Solution**: Increase timeout values, check selector accuracy

**Issue**: CAPTCHA appears  
**Solution**: Reduce test frequency, add delays between requests

**Issue**: Cart has unexpected items  
**Solution**: Clear cart before test suite or use separate test accounts

**Issue**: Mobile tests fail  
**Solution**: Verify viewport size is set correctly

**Issue**: Product not available  
**Solution**: Use more generic search terms that always have results

## Performance

- Average test execution time: ~3-5 minutes for full suite
- Single test: ~10-30 seconds depending on complexity
- Parallel execution: Tests can run in parallel except cart operations

## Best Practices Applied

✅ Page Object Model for reusability  
✅ Explicit waits instead of hard delays  
✅ Proper error handling  
✅ Descriptive test names  
✅ Console logging for debugging  
✅ Screenshot capture on failures  
✅ Organized test suites by feature  
✅ Timeout handling for slow elements  
✅ Mobile viewport testing  
✅ Multiple browser testing (Chrome, Edge)  

## Future Enhancements

- [ ] Add visual regression testing
- [ ] Implement data-driven testing with external CSV/JSON
- [ ] Add performance metrics collection
- [ ] Create custom fixtures for common setups
- [ ] Add API tests for product data validation
- [ ] Implement test retry logic
- [ ] Add allure reporting
- [ ] Create test data cleanup utilities

---

**Last Updated**: January 16, 2026  
**Test Framework**: Playwright with TypeScript  
**Node Version**: 20+  
**Playwright Version**: 1.40+
