import { test } from '../../pages/base-page';

import { user } from '../../data/login.data';
import { Constants } from '../../utilities/constants';

test.describe('Wish List Tests', () => {

  test.beforeEach(async ({ commonPage, loginPage, homePage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
    await commonPage.goto(Constants.HOME_URL);
    await homePage.addFirstProductToWishlist();
  });
  /**
   * TC-WL-003: Add product from wishlist to cart
   */
  test('TC-WL-003: Add product from wishlist to cart', async ({ homePage, wishlistPage }) => {
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.addProductToCartAndVerify();
  });
  /**
   * TC-WL-004: Remove product from wishlist
   */
  test('TC-WL-004: Remove product from wishlist', async ({ homePage, wishlistPage }) => {
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.removeFirstProductAndVerify();
  });
  /**  
   *  
   *  TC-WL-005: Verify Wishlist State
  */
  test('TC-WL-005: link to product detail', async ({ homePage, wishlistPage }) => {
    await homePage.clickWishListIcon();
    await wishlistPage.verifyWishlistNotEmpty();
    await wishlistPage.openFirstProductAndVerifyDetail();

  });

});
