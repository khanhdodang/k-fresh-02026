import { Page, expect } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { HomeLocators } from '../locators/home-locators';

/**
 * HomePage class
 * ---------------------------------------------------
 * Handles all actions and verifications on the Home page.
 * Extends HomeLocators to reuse UI element definitions.
 */
export class HomePage extends HomeLocators {

  /** Common reusable page actions */
  commonPage: CommonPage;

  /** Store product name for reuse across steps */
  private productName: string = '';

  /**
   * Constructor
   * @param {Page} page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Click on Wishlist icon in header
   *
   * @returns {Promise<void>}
   */
  @step('Click Wishlist Icon')
  async clickWishListIcon(): Promise<void> {
    await this.wishListIcon.click();
  }

  /**
   * Get product name by index on Home page
   *
   * @param {number} index - Product index (0-based), defaults to 0
   * @returns {Promise<void>}
   */
  @step('Get product name by index')
  async getFirstProductName(index: number = 0): Promise<void> {
    const name = await this.getProductNameByIndex(index).textContent();
    this.productName = name?.trim() || '';
  }

  /**
   * Add the first product on Home page to Wishlist
   *
   * @returns {Promise<void>}
   */
  @step('Add first product to Wishlist')
  async addFirstProductToWishlist(): Promise<void> {
    await this.productCards.first().hover();
    await this.getAddToWishlistButton(0).click();
  }

  /**
   * Verify success message after adding product to Wishlist
   *
   * @returns {Promise<void>}
   */
  @step('Verify product added to Wishlist successfully')
  async verifyProductAddedToWishlist(): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlertMessage).toContainText(this.productName);
  }

  /**
   * Get stored product name
   *
   * @returns {string} Stored product name
   */
  getProductName(): string {
    return this.productName;
  }
}
