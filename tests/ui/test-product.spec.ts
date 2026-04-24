import { test } from "../../pages/base-page";
import { user } from "../../data/login.data";
import { Constants } from "../../utilities/constants";
import { productData } from "../../data/product-data";
test.describe("Product Tests", () => {
  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.BASE_URL);
  });

  test(`verify product detail page for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.openProductDetail(productData.productName);
  });

  test(`verify add to compare functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.clickAddToCompareButton(productData.productName);
    await productPage.expectCompareNotificationBox();
  });

  test(`verify pop-up functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkPopupFunctionality(productData.productName);
  });

  test(`verify quantity counter functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkQuantityCounterFunctionality(
      productData.productName,
    );
    await productPage.incrementDecrementQuantityAndVerify(
      productData.productName,
    );
    await productPage.decrementQuantityAndVerify(productData.productName);
    await productPage.verifyFinalQuantityValue(productData.productName);
    await productPage.fillQuantityInputDirectlyAndVerify(
      productData.productName,
    );
  });

  test(`verify size chart functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkSizeChartFunctionality(productData.productName);
  });
});
