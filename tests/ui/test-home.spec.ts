import { test } from "../../pages/base-page";
import { expect } from "@playwright/test";
import { Constants } from "../../utilities/constants";
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';

test.describe("Home Tests", () => {
  let userProfile: UserProfile;
  test.beforeEach(async ({ commonPage, registerPage }) => {
    userProfile = generateUserProfileData();
    await commonPage.goto(Constants.REGISTER_URL);
    await registerPage.fillRegistrationForm(userProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
  });

  test("TC-WL-001: Access Wishlist page", async ({ homePage, page }) => {
    await homePage.clickWishListIcon();
    await expect(page).toHaveURL(Constants.WISHLIST_URL);
  });

  test("TC-WL-002: Add Product to Wishlist", async ({ homePage, wishlistPage, commonPage }) => {
    await commonPage.goto(Constants.HOME_URL);
    await homePage.getFirstProductName();
    await homePage.addFirstProductToWishlist();
    await homePage.verifyProductAddedToWishlist();
    await homePage.clickWishListIcon();
    await wishlistPage.verifyProductExists(homePage.getProductName());
  });
});
