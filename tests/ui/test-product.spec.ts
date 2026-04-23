import { test } from "../../pages/base-page";
import { user } from "../../data/login.data";
import { Constants } from "../../utilities/constants";

test.describe("Product Tests", () => {
  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.BASE_URL);
  });

  test(`verify product detail page for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.openProductDetail(Constants.PRODUCT_NAME);
  });

  test(`verify add to compare functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.clickAddToCompareButton(Constants.PRODUCT_NAME);
    await productPage.expectCompareNotificationBox();
  });

  test(`verify pop-up functionality for ${Constants.ENV} environment`, async ({
    commonPage,
    productPage,
  }) => {
    await productPage.checkPopupFunctionality(Constants.PRODUCT_NAME);
  });
});
