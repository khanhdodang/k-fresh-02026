import { test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';

test.describe('Wish List Tests', () => {
  let userProfile: UserProfile;
  test.beforeEach(async ({ commonPage, registerPage }) => {
    userProfile = generateUserProfileData();
    await commonPage.goto(Constants.REGISTER_URL);
    await registerPage.fillRegistrationForm(userProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
    await commonPage.goto(Constants.HOME_URL);
  });

  test('TC-WL-003: Add product from wishlist to cart', async ({ homePage, wishlistPage }) => {
    await homePage.addFirstProductToWishlist();
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.addProductToCartAndVerify();
  });

  test('TC-WL-004: Remove product from wishlist', async ({ homePage, wishlistPage }) => {
    await homePage.addFirstProductToWishlist();
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.removeFirstProductAndVerify();
  });

  test('TC-WL-005: link to product detail', async ({ homePage, wishlistPage }) => {
    await homePage.addFirstProductToWishlist();
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.openFirstProductAndVerifyDetail();

  });
});
