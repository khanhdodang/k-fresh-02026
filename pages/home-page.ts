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
   * Add the first product on Home page to Wishlist
   * @returns {Promise<string>} Product name that was added
   */
  @step('Add first product to Wishlist')
  async addFirstProductToWishlist(): Promise<string> {
    const productName = await this.getProductNameByIndex(0).textContent();

    await this.productCards.first().hover();
    await this.getAddToWishlistButton(0).click();

    return productName?.trim() || '';
  }

  /**
   * Verify success message after adding product to Wishlist
   * 
   * @param {string} productName - Expected product name in success message
   * @returns {Promise<void>}
   */
  @step('Verify product added to Wishlist successfully')
  async verifyProductAddedToWishlist(productName: string): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlertMessage).toContainText(productName);
  }
}