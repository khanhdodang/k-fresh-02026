import { test } from '../../pages/base-page';
import { user } from '../../data/login.data';
import { expect } from '@playwright/test';
import { Constants } from '../../utilities/constants';

test.describe('Wish List Tests', () => {

  test.beforeEach(async ({ commonPage, loginPage }) => {
    // Đăng nhập → homepage (product listing xuất hiện ngay)
    await commonPage.goto(Constants.BASE_URL);
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
    await commonPage.goto(Constants.BASE_URL);
  });

  /**
   * TC-WL-003: Navigate to product detail
   * Verify clicking product name in Wishlist navigates to product detail page
   */
  test('TC-WL-003: Navigate to product detail', async ({
    homePage,
    wishlistPage,
    page,
  }) => {
    // Thêm sản phẩm thứ 2 vào Wishlist
    const productName = await homePage.addSecondProductToWishList();

    // Điều hướng đến Wishlist qua menu
    await homePage.selectMenu('Wish List');

    // Click tên sản phẩm để vào trang chi tiết
    await wishlistPage.goToProductDetail(productName);

    // Assert: URL chứa product_id
    await expect(page).toHaveURL(/product_id/);
  });

  /**
   * TC-WL-004: Remove product from Wishlist
   * Verify removed product no longer appears in Wishlist table
   */
  test('TC-WL-004: Remove product from Wishlist', async ({
    homePage,
    wishlistPage,
  }) => {
    // Thêm sản phẩm thứ 2 vào Wishlist
    const productName = await homePage.addSecondProductToWishList();

    // Điều hướng đến Wishlist qua menu
    await homePage.selectMenu('Wish List');

    // Xóa sản phẩm khỏi Wishlist (hàm đã assert successMessage bên trong)
    await wishlistPage.removeProductFromWishList(productName);

    // Assert: Sản phẩm đã xóa KHÔNG còn xuất hiện trong danh sách
    const products = await wishlistPage.getWishListProducts();
    expect(products.some(p => p.name === productName)).toBeFalsy();
  });

  /**
   * TC-WL-005: Wishlist persistence after reload
   * Verify Wishlist data is retained after page reload
   */
  test('TC-WL-005: Wishlist persistence after reload', async ({
    homePage,
    wishlistPage,
    page,
  }) => {
    // Thêm sản phẩm thứ 2 vào Wishlist
    const productName = await homePage.addSecondProductToWishList();

    // Điều hướng đến Wishlist qua menu
    await homePage.selectMenu('Wish List');

    // Reload trang Wishlist
    await page.reload();

    // Assert: Sản phẩm vẫn còn trong danh sách sau khi reload
    const products = await wishlistPage.getWishListProducts();
    expect(products.some(p => p.name === productName)).toBeTruthy();
  });
});