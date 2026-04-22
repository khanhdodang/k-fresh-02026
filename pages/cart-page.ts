import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CartLocators } from '../locators/cart-locators';
import { Product } from '../models/product';

export class CartPage extends CartLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the "Cart" button to navigate to the cart page.
   */
  @step('Click Cart Button')
  async clickCartButton(): Promise<void> {
  }


  /**
   * Clicks the "Checkout" button to proceed to the checkout page.
   */
  @step('Click Checkout Button')
  async clickCheckoutButton(): Promise<void> {
  }

  /**
   * Clicks the "Edit Cart" button to navigate to the cart editing page.
   */
  @step('Click Edit Cart Button')
  async clickEditCartButton(): Promise<void> {
  }

  /**
   * Retrieves the list of items in the cart.
   * @returns A promise resolving to an array of cart items.
   */
  @step('Get Cart Items')
  async getCartItems(): Promise<Product[]> {
    return [];
  }

}
