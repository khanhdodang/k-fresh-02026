import { test } from '../../pages/base-page';
import { user } from '../../data/login.data';
import { Constants } from '../../utilities/constants';
import { CommonPage } from '../../pages/common-page';

test.describe('Compare Products Tests', () => {

  test.beforeEach(async ({ commonPage, loginPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
  });

  test('TC-CP-001 | Add 2 products to Compare and verify compare page', async ({ commonPage, productPage }) => {
        // ── STEP 1-2: Access category page ────────────────────
    await commonPage.clickSidebarItem(' Phone, Tablets & Ipod');
    await commonPage.verifyPageLoaded();

    // ── STEP 3-5: Add HTC Touch HD, check toast and close ──
    await productPage.clickAddToCompareButton('HTC Touch HD');
    await productPage.verifyProductInToast('HTC Touch HD');

    // await categoryPage.addAndVerifyProductInToast(PRODUCTS.HTC, 1);
    // await categoryPage.closeToast();

    // ── STEP 6-8: Add Palm Treo Pro, check toast ─────────
    // await categoryPage.addAndVerifyProductInToast(PRODUCTS.PALM, 2);
    // await categoryPage.closeToast();


    // // ── STEP 9-10: Access compare page, verify title ──────
    // await comparePage.navigate();
    // await comparePage.verifyPageLoaded();

    // // ── STEP 11-15: Check data in Compare table ──────
    // await comparePage.verifyProductsDetails(PRODUCTS.HTC, PRODUCTS.PALM);
  });

  // test('TC-CP-002 | Verify all compare table details with 3 products', async ({ }) => {

  // });

    // test('TC-CP-003 | Remove one product from compare and verify table updates', async ({ }) => {

  // });

    // test('TC-CP-004 | Remove all products and verify empty state', async ({ }) => {

  // });

    // test('TC-CP-005 | Verify duplicate handling with page navigation', async ({ }) => {

  // });


});
