import { test } from "../../pages/base-page";
import { expect } from "@playwright/test";
import { user } from "../../data/login.data";
import { Constants } from "../../utilities/constants";

test.describe("Home Tests", () => {

  test.beforeEach(async ({ commonPage, loginPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
  });

  /**
   * TC-WL-001: Access Wishlist page
   * Verify clicking the Wishlist icon navigates to the Wishlist URL
   */
  test("TC-WL-001: Access Wishlist page", async ({ homePage, page }) => {
    await homePage.clickWishListIcon();
    await expect(page).toHaveURL(Constants.WISHLIST_URL);
  });

  /**
   * TC-WL-002: Add Product to Wishlist
   * Verify the second product can be added to Wishlist and appears in the table
   */
  test("TC-WL-002: Add Product to Wishlist", async ({ homePage, wishlistPage, commonPage }) => {

    await commonPage.goto(Constants.HOME_URL);

    const productName = await homePage.addFirstProductToWishlist();

    await homePage.verifyProductAddedToWishlist(productName);

    await homePage.clickWishListIcon();

    await wishlistPage.verifyProductExists(productName);
  });
});