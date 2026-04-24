import { test } from '../../pages/base-page';
import { user } from '../../data/login.data';
import { Constants } from '../../utilities/constants';
import { expect } from '@playwright/test';

import { products, PRODUCTS } from '../../data/products.data';

test.describe('Compare Products Tests', () => {

  test.beforeEach(async ({ commonPage, loginPage }) => {
    // await commonPage.goto(Constants.LOGIN_URL);
    // await loginPage.login(user);
    await commonPage.goto(Constants.CATEGORY_URL);
  });

  test('TC-CP-001 | Add 2 products to Compare and verify compare page', async ({ commonPage, productPage, compareProductsPage }) => {
    // ── STEP 1-2: Access category page ────────────────────
    await commonPage.verifyPageLoaded();

    // ── STEP 3-5: Add HTC Touch HD, check toast and close ──
    await productPage.performActionOnProduct(products.htcTouch, 'Compare');
    await productPage.verifyProductInToast(products.htcTouch.name);
    await commonPage.closeToast(); // Ensure toast is closed after verification

    await productPage.performActionOnProduct(products.canon, 'Compare');
    await productPage.verifyProductInToast(products.canon.name);

    // ── STEP 6-8: Navigate to compare page ───────────────
    await productPage.clickNavigateToComparePage()

    // // ── STEP 9-10: Access compare page, verify title ──────
    await commonPage.verifyPageLoaded();

    // // ── STEP 11-15: Check data in Compare table ──────
    await compareProductsPage.verifyProductsDetails(products.canon.name, products.htcTouch.name);
  });

  test('TC-CP-002 | Verify all compare table details with 3 products', async ({ commonPage, productPage, compareProductsPage }) => {
    // ── STEP 1-2: Access category page ────────────────────
    await commonPage.goto(Constants.CATEGORY_URL);
    await commonPage.verifyPageLoaded();

    // ── STEP 3-5: Add HTC Touch HD, check toast and close ──
    await productPage.performActionOnProduct(products.htcTouch, 'Compare');
    await productPage.verifyProductInToast(products.htcTouch.name);
    await commonPage.closeToast(); // Ensure toast is closed after verification

    await productPage.performActionOnProduct(products.canon, 'Compare');
    await productPage.verifyProductInToast(products.canon.name);
    await commonPage.closeToast(); // Ensure toast is closed after verification

    await productPage.performActionOnProduct(products.palmTreo, 'Compare');
    await productPage.verifyProductInToast(products.palmTreo.name);

    // ── STEP 6-8: Navigate to compare page ───────────────
    await productPage.clickNavigateToComparePage()

    // // ── STEP 9-10: Access compare page, verify title ──────
    await commonPage.verifyPageLoaded();

    // // ── STEP 11-15: Verify information of the products in grid ──────
    await compareProductsPage.verifyProductsDetails(products.canon.name, products.htcTouch.name, products.palmTreo.name);
    await compareProductsPage.verifyRow(compareProductsPage.getAvailability(), (a) => expect(a.length).toBeGreaterThan(0));
    await compareProductsPage.verifyRow(compareProductsPage.getRatings(), (r) => expect(r.toLowerCase()).toContain('reviews'));
    await compareProductsPage.verifyRow(compareProductsPage.getWeights(), (w) => expect(w.length).toBeGreaterThan(0));
    await compareProductsPage.verifyRow(compareProductsPage.getDimensions(), (d) => expect(d).toContain('x'));
  });

  test('TC-CP-003 | Remove one product from compare and verify table updates', async ({productPage, commonPage, compareProductsPage }) => {
 test.setTimeout(60000); 

    // ── STEP 1-2: Access category page ────────────────────
    await commonPage.verifyPageLoaded(); 
    // ── STEP 3-5: Add HTC Touch HD, check toast and close ──
    await productPage.performActionOnProduct(products.htcTouch, 'Compare');
    await productPage.verifyProductInToast(products.htcTouch.name);
    await commonPage.closeToast(); 

    await productPage.performActionOnProduct(products.canon, 'Compare');
    await productPage.verifyProductInToast(products.canon.name);

    await productPage.clickNavigateToComparePage()
    await commonPage.verifyPageLoaded();

    await compareProductsPage.verifyProductsDetails(products.canon.name, products.htcTouch.name);

    await compareProductsPage.removeProductFromCompare(products.htcTouch.id);

    await commonPage.goto(Constants.CATEGORY_URL);
    await productPage.performActionOnProduct(products.ipod, 'Compare');
    await productPage.clickNavigateToComparePage()
    await compareProductsPage.verifyProductsDetails(products.canon.name, products.ipod.name);

  });

  // test('TC-CP-004 | Remove all products and verify empty state', async ({ }) => {

  // });

  test('TC-CP-005 | Verify duplicate handling with page navigation', async ({commonPage, compareProductsPage, productPage }) => {
    // ── STEP 3-5: Add HTC Touch HD, check toast and close ──
    await productPage.performActionOnProduct(products.htcTouch, 'Compare');
    await productPage.verifyProductInToast(products.htcTouch.name);
    await commonPage.closeToast(); // Ensure toast is closed after verification

    await productPage.performActionOnProduct(products.canon, 'Compare');
    await productPage.verifyProductInToast(products.canon.name);

    await productPage.clickNavigateToComparePage()
    await commonPage.verifyPageLoaded();

    await compareProductsPage.verifyProductsDetails(products.canon.name, products.htcTouch.name);
    await commonPage.goBack();
    
    await productPage.performActionOnProduct(products.canon, 'Compare');
    await productPage.verifyProductInToast(products.canon.name);

    await productPage.clickNavigateToComparePage()
    await commonPage.verifyPageLoaded();

    await compareProductsPage.verifyNoDuplicateProducts()
  });
});
