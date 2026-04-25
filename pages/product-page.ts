import { expect, Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { ProductLocators } from '../locators/product-locators';
import { Product } from '../models/product';

export class ProductPage extends ProductLocators {
  clickUpdateQuantity() {
    throw new Error('Method not implemented.');
  }

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Increases the product quantity by clicking the increase quantity button a specified number of times
   * @param product
   */
  @step('Increasing the product quantity by a specified number of times')
  async increaseQuantity(product: Product): Promise<void> {
    for (let index = 1; index < product.quantity; index++) {
      await this.btnIncreaseQuantity.click();
    }
  }

  /**
   * Clicks the add to cart button to add the product to the cart
   */
  @step('Clicking the add to cart button to add the product to the cart')
  async clickAddToCart(): Promise<void> {
    await this.commonPage.roleButtonName('Add to Cart').click();
  }

  /**
   * Verifies that the success alert displays the expected message after adding a product to the cart
   * @param expectedMessage
   */
  @step('Verifying that the success alert displays the expected message after adding a product to the cart')
  async verifyAddToCartSuccessMessage(expectedMessage: string): Promise<void> {
    await expect(this.divSuccessAlert).toContainText(expectedMessage);
  }

  /**
   * Clicks the view cart link in the success alert to navigate to the cart page
   */
  @step('Clicking the view cart link in the success alert to navigate to the cart page')
  async clickViewCartLink(): Promise<void> {
    await this.commonPage.roleLinkName('View Cart', false).click();
  }
  
  /**
     * Sets the quantity of the product to be added to the cart.
     * @param qty 
     */
  @step('Set product quantity')
  async setQuantity(qty: number): Promise<void> {
    await this.inputQuantity.fill(qty.toString());
  @step('Search and Navigate to Product Page via UI Navigation')
  async searchAndSelectProduct(product: Product): Promise<void> {
    await this.commonPage.fill(this.searchInput.first(), product.name);
    await this.commonPage.press(this.searchInput.first(), 'Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.commonPage.waitForVisible(this.firstProductImage);
    await this.commonPage.click(this.firstProductImage);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
