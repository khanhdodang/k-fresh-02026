import { test } from "../../pages/base-page";
import { Constants } from "../../utilities/constants";
import { productData } from "../../data/product-data";

test.describe("Product Tests", () => {
  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.BASE_URL);
  });

  test(`TC01 - Verify product detail page for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.openProductDetail(productData.productName);
  });

  test(`TC02 - Verify add to compare functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.clickAddToCompareButton(productData.productName);
    await productPage.expectCompareNotificationBox();
  });

  test(`TC03 - Verify size chart functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkSizeChartFunctionality(productData.productName);
  });

  test(`TC04 - Verify pop-up functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkPopupFunctionality(productData.productName);
  });

  test(`TC05 - Verify quantity counter functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkQuantityCounterFunctionality(productData.productName);
    await productPage.incrementDecrementQuantityAndVerify(productData.productName);
    await productPage.decrementQuantityAndVerify(productData.productName);
    await productPage.verifyFinalQuantityValue(productData.productName);
    await productPage.fillQuantityInputDirectlyAndVerify("10");
  });
});
