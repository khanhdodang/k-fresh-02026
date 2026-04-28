import { Page, expect } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { WishListLocators } from '../locators/wish-list-locators';

export class WishListPage extends WishListLocators {

  /** Common reusable page actions */
  commonPage: CommonPage;

  /**
   * Constructor
   * @param {Page} page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  // ─────────────────────────────────────────────────────────────
  // TC-WL-003: Navigate to Product Detail
  // ─────────────────────────────────────────────────────────────

  /**
   * Get the name of the first product in wishlist
   * 
   * @returns {Promise<string>} First product name
   */
  @step('Get first product name in wishlist')
  async getFirstProductName(): Promise<string> {
    await expect(this.firstProductName).toBeVisible();
    return (await this.firstProductName.textContent())?.trim() || '';
  }

  /**
   * Click product link to navigate to product detail page
   * 
   * @param {string} productName - Name of product to click
   * @returns {Promise<void>}
   */
  @step('Click product link to go to product detail')
  async goToProductDetail(productName: string): Promise<void> {
    const productLink = this.getProductLink(productName);

    await productLink.waitFor({ state: 'visible' });

    // Force click to avoid viewport / overlap issues
    await productLink.click({ force: true });
  }

  /**
   * Verify user is redirected to product detail page
   * 
   * @returns {Promise<void>}
   */
  @step('Verify redirected to product detail page')
  async verifyProductDetailPage(): Promise<void> {
    await expect(this.page).toHaveURL(/product_id/);
  }

  /**
   * Open first product from wishlist and verify detail page
   * @returns {Promise<void>}
   */
  @step('Open first product detail from wishlist and verify')
  async openFirstProductAndVerifyDetail(): Promise<void> {
    const productName = await this.getFirstProductName();
    await this.goToProductDetail(productName);
    await this.verifyProductDetailPage();
  }

  // ─────────────────────────────────────────────────────────────
  // TC-WL-004: Remove Product
  // ─────────────────────────────────────────────────────────────

  /**
   * Remove first product and verify wishlist row count is decreased
   * 
   * @returns {Promise<void>}
   */
  @step('Remove first product and verify row count decreased')
  async removeFirstProductAndVerify(): Promise<void> {
    const countBefore = await this.getRowCount();

    await this.removeFirstProduct();

    await this.page.waitForLoadState('networkidle');

    const countAfter = await this.getRowCount();

    expect(countAfter).toBeLessThan(countBefore);
  }

  /**
   * Remove the first product from wishlist
   * 
   * @returns {Promise<void>}
   */
  @step('Remove first product from wishlist')
  async removeFirstProduct(): Promise<void> {
    const row = this.wishlistRows.first();
    await expect(row).toBeVisible();

    const removeBtn = this.getRemoveButtonByRow(0);
    await removeBtn.click();
  }

  // ─────────────────────────────────────────────────────────────
  // TC-WL-005: Verify Wishlist State
  // ─────────────────────────────────────────────────────────────

  /**
   * Verify a product exists in wishlist by name
   * 
   * @param {string} productName - Product name to verify
   * @returns {Promise<void>}
   */
  @step('Verify product still exists in wishlist after reload')
  async verifyProductExists(productName: string): Promise<void> {
    const row = this.getRowByProductName(productName).first();
    await expect(row).toBeVisible();
  }

  /**
   * Verify wishlist is not empty
   * 
   * @returns {Promise<void>}
   */
  @step('Verify wishlist is not empty')
  async verifyWishlistNotEmpty(): Promise<void> {
    await expect(this.emptyMessage).not.toBeVisible();
    await expect(this.wishlistRows.first()).toBeVisible();
  }

  /**
   * Add first product from wishlist to cart
   * @returns {Promise<string>} Product name added to cart
   */
  @step('Add first product from wishlist to cart')
  async addProductToCart(): Promise<string> {
    await expect(this.wishlistRows.first()).toBeVisible();

    const productName =
      (await this.firstProductName.textContent())?.trim() || '';

    await this.hoverRowAction(0);

    const addBtn = this.getAddButtonByRow(0);
    await expect(addBtn).toBeVisible();

    await addBtn.click({ force: true });

    return productName;
  }

  /**
   * Verify product added to cart successfully
   * 
   * @param {string} productName - Expected product name in success message
   * @returns {Promise<void>}
   */
  @step('Verify product added to cart successfully')
  async verifyProductAddedToCart(productName: string): Promise<void> {
    const success = this.page.locator("#notification-box-top");

    await expect(success).toBeVisible();
    await expect(success).toContainText(productName);
  }

  /**
   * Add product to cart and verify success
   * 
   * @returns {Promise<void>}
   */
  @step('Add first product from wishlist to cart and verify')
  async addProductToCartAndVerify(): Promise<void> {
    const productName = await this.addProductToCart();
    await this.verifyProductAddedToCart(productName);
  }

  /**
   * Get current number of products in wishlist
   * 
   * @returns {Promise<number>} Number of rows in wishlist table
   */
  @step('Get current wishlist row count')
  async getRowCount(): Promise<number> {
    return await this.wishlistRows.count();
  }
}
