import { test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
import { expect } from '@playwright/test';
import { products } from '../../data/products.data';

test.describe('Compare Products Tests', () => {

  test.beforeEach(async ({ commonPage }) => {
    // Navigate to the category page before each test
    await commonPage.goto(Constants.CATEGORY_URL);
  });

  test('TC-CP-001 | Add 2 products to Compare and verify compare page', async ({ productPage, compareProductsPage }) => {
    // STEP: Add products to compare list
    await productPage.addProductsToCompare(products.htcTouch, products.canon);
    
    // STEP: Navigate via toast and verify the products in the table
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.canon, products.htcTouch);
  });

  test('TC-CP-002 | Verify all compare table details with 3 products', async ({ productPage, compareProductsPage }) => {
    // STEP: Add 3 products to compare
    await productPage.addProductsToCompare(products.htcTouch, products.canon, products.palmTreo);
    
    // STEP: Navigate and perform initial verification of product names
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(
      products.canon, 
      products.htcTouch, 
      products.palmTreo
    );

    // STEP: Verify specific technical rows in the comparison table
    await compareProductsPage.verifyRow(compareProductsPage.getAvailability(), (a) => expect(a.length).toBeGreaterThan(0));
    await compareProductsPage.verifyRow(compareProductsPage.getRatings(), (r) => expect(r.toLowerCase()).toContain('reviews'));
    await compareProductsPage.verifyRow(compareProductsPage.getWeights(), (w) => expect(w.length).toBeGreaterThan(0));
    await compareProductsPage.verifyRow(compareProductsPage.getDimensions(), (d) => expect(d).toContain('x'));
  });

  test('TC-CP-003 | Remove one product from compare and verify table updates', async ({ productPage, commonPage, compareProductsPage }) => {
    test.setTimeout(60000);

    // STEP: Add 2 products and navigate to compare page
    await productPage.addProductsToCompare(products.htcTouch, products.canon);
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.canon, products.htcTouch);

    // STEP: Remove one product and verify list is updated
    await compareProductsPage.removeProductsFromCompare(products.htcTouch);

    // STEP: Go back to category, add a different product and re-verify
    await commonPage.goto(Constants.CATEGORY_URL);
    await productPage.addProductsToCompare(products.ipod);
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.ipod, products.canon,);
  });

  test('TC-CP-004 | Remove all products and verify empty state', async ({ commonPage, compareProductsPage, productPage }) => {
    // STEP: Add products and navigate to compare page
    await productPage.addProductsToCompare(products.htcTouch, products.canon);
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.canon, products.htcTouch);

    // STEP: Remove all products from the comparison table
    await compareProductsPage.removeProductsFromCompare(products.canon, products.htcTouch);

    // STEP: Click continue and verify user is redirected to home/store page
    await compareProductsPage.clickContinueButton();
    await commonPage.verifyPageLoaded('Your Store');

    // STEP: Access compare URL directly and verify empty message
    await commonPage.goto(Constants.COMPARE_URL);
    await compareProductsPage.verifyNoProductOnComparionPage('You have not chosen any products to compare.');
  });

  test('TC-CP-005 | Verify duplicate handling with page navigation', async ({ commonPage, compareProductsPage, productPage }) => {
    // STEP: Initial add and navigation
    await productPage.addProductsToCompare(products.htcTouch, products.canon);
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.canon, products.htcTouch);

    // STEP: Go back and try to add a duplicate product
    await commonPage.goBackPage();
    await productPage.addProductsToCompare(products.canon);

    // STEP: Navigate back to compare page and verify no duplicates exist
    await compareProductsPage.verifyComparePageDisplaysCorrectProducts(products.canon, products.htcTouch);
    await compareProductsPage.verifyNoDuplicateProducts();
  });
});
