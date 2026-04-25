import test, { expect, Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CheckoutLocators } from '../locators/checkout-locators';
import { Address } from '../models/address';
import { UserProfile } from '../models/user';
import { Order } from '../models/order';

export class CheckoutPage extends CheckoutLocators {
  static fillBillingDetails(user: UserProfile, arg1: Order) {
    throw new Error('Method not implemented.');
  }

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the "Place Order" button to submit the order.
   */
  @step('Click Place Order Button')
  async clickPlaceOrderButton(): Promise<void> {
    await this.btnConfirmOrder.click();
  }

  /**
   * Clicks the "Agree to Terms" checkbox.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.chkTerms.click();
  }

  /**
   * Clicks the "Continue" button for the specified section.
   */
  @step('Click Continue Button')
  async clickContinueButton(): Promise<void> {
    await this.btnContinue.click();
  }

  /**
   * Retrieves the list of products in the checkout.
   * @returns A promise resolving to an array of products.
   */
  @step('Get Product List')
  async getProductList(): Promise<any[]> {
    return [];
  }

  /**
   * Fills the billing details form with the provided information.
   * @param details The billing details to fill.
   */
  @step('Fill Billing Details')
  async fillBillingDetails(user: UserProfile, order: Order): Promise<void> {
      await test.step('Filling in the billing address details', async () => {
        await this.inputFirstName.fill(user.firstName);
        await this.inputLastName.fill(user.lastName);
        await this.inputCompany.fill(order.company);
        await this.inputAddress1.fill(order.address);
        await this.inputCity.fill(order.city);
        await this.inputPostcode.fill(order.postcode);
        await this.ddlCountry.selectOption({ label: order.country });
        await this.page.waitForTimeout(1000);
        await this.ddlRegion.selectOption({ label: order.region });
      });
    }

  /**
   * Verifies order success page has loaded.
   */
  @step('Verify Order Success')
  async verifyOrderSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/route=checkout\/success/);
  }

  /**
   * Fills the shipping details form with the provided information.
   * @param details The shipping details to fill.
   */
  @step('Fill Shipping Details')
  async fillShippingDetails(details: Address): Promise<void> {
  }

  /**
   * Removes a product from the checkout.
   * @param productName The name of the product to remove.
   */
  @step('Remove Product from Checkout')
  async removeProductFromCheckout(productName: string): Promise<void> {
  }

  /**
   * Updates the quantity of a product in the checkout.
   * @param productName The name of the product to update.
   * @param quantity The new quantity for the product.
   */
  @step('Update Product Quantity')
  async updateProductQuantity(productName: string, quantity: number): Promise<void> {
  }

}
