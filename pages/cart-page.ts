import { Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CartLocators } from '../locators/cart-locators';
import { Product } from '../models/product';

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
import { Currency } from '../utilities/currency';
import { AssertHelper } from './assert-helper-page';
import { Assertions } from '../utilities/assertions';

export class CartPage extends CartLocators {
  verifyCartPageDisplayed() {
    throw new Error('Method not implemented.');
  }

  commonPage: CommonPage;
  assertHelper: AssertHelper;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
    this.assertHelper = new AssertHelper();
  }
  
  /**
   * Clicks the "Cart" button to navigate to the cart page.
   */
  @step('Click Cart Button')
  async clickCartButton(): Promise<void> {
    // await this.btnCart.click();
    if (!(await this.miniCartDrawer.isVisible())) {
      await this.btnCart.click({ force: true });
    }
    await expect(this.miniCartDrawer).toBeVisible();
    await this.btnViewCart.click({force: true});
    await this.commonPage.click(this.btnCart);
  }

  /**
   * Clicks the "Checkout" button to proceed to the checkout page.
   */
  @step('Click Checkout Button')
  async clickCheckoutButton(): Promise<void> {
    await this.commonPage.roleButtonName('Checkout', true).click();
  }

  @step('Update Quantity')
  async updateQuantity(quantity: number, productName: string): Promise<void> {
    await this.inputQuantity(productName).fill(quantity.toString());
    await this.commonPage.click(this.commonPage.roleButtonName('Checkout'));

  }

  /**
   * Clicks the "Edit Cart" button to navigate to the cart editing page.
   */
  @step('Click Edit Cart Button')
  async clickEditCartButton(): Promise<void> {
    await this.commonPage.click(this.commonPage.roleButtonName('Edit cart').first());
  }

  /**
   * Verifies that the main cart page displays the expected message when the cart is empty
   * @param expectedMessage
   */
  @step('Verifying that the main cart page displays the expected message when the cart is empty')
  async verifyMainCartIsEmpty(expectedMessage: string): Promise<void> {
    await this.assertHelper.assertElementContainsText(this.pMainCartMessage, expectedMessage);
  }

  /**
   * Retrieves the list of items in the cart.
   * @returns A promise resolving to an array of cart items.
   */
  @step('Get Cart Items')
  async getCartItems(): Promise<Product[]> {
    return [];
  }

  /**
   * Verifies that a specific product has been added to the cart
   * @param product The product to verify
   */
  @step('Verifying that the product is added to the cart')
  async verifyProductAddedToCart(product: Product): Promise<void> {
    await this.assertHelper.assertElementVisible(this.rowProduct(product.name));
    await this.assertHelper.assertElementHasValue(this.inputQuantity(product.name), product.quantity.toString());
    const totalText = await this.commonPage.innerText(this.cellTotal(product.name));
    const actualTotal = Currency.parseCurrency(totalText);
    const expectedTotal = product.price * product.quantity;
    Assertions.assertEqual(actualTotal, expectedTotal, `Expected total for ${product.name} to be ${expectedTotal}`);
  }

  /**
   * Clicks the view cart link in the success alert to navigate to the cart page
   */
  @step('Clicking the view cart link in the success alert to navigate to the cart page')
  async clickViewCartLink(): Promise<void> {
    await this.commonPage.roleLinkName('View Cart', false).click();
  }

  /**
   * Clicks the remove button for a specific product in the cart to remove it
   * @param product
   */
  @step('Clicking the remove button for a specific product in the cart to remove it')
  async clickRemoveProduct(product: Product): Promise<void> {
    await this.commonPage.click(this.btnRemove(product.name));
  }
  
  /**
   * Removes all products from the cart if any exist
   */
  @step('Removing all products from the cart')
  async removeAllProducts(): Promise<void> {
    let removeButtonsCount = await this.commonPage.count(this.btnRemoveItems);
    while (removeButtonsCount > 0) {
      await this.commonPage.click(this.btnRemoveItems.first());
      await this.commonPage.waitForMillis(1000);
      removeButtonsCount = await this.commonPage.count(this.btnRemoveItems);
    }
  }

  /**
   * Verifies that a specific product has been removed from the cart by checking that it no longer appears in the cart table
   * @param product
   */
  @step('Click Update Quantity Button')
  async clickUpdateQuantity(productName: string): Promise<void> {
    await this.btnUpdate(productName).click({ force: true });
  }

  /**
  * Verifies that a specific product has been removed from the cart by checking that it no longer appears in the cart table
  * @param product
  */
  @step('Verifying that a specific product has been removed from the cart by checking that it no longer appears in the cart table')
  async verifyProductRemovedFromCart(product: Product): Promise<void> {
    await this.assertHelper.assertElementNotVisible(this.rowProduct(product.name));
  }

  /**
   * Updates the quantity of a specific product in the cart by filling the quantity input and clicking the update button
   * @param product
   */
  @step('Updating the quantity of a specific product in the cart by filling the quantity input and clicking the update button')
  async updateProductQuantity(product: Product): Promise<void> {
    await this.commonPage.fill(this.inputQuantity(product.name), product.quantity.toString());
    await this.commonPage.click(this.btnUpdate(product.name));
  }

  /**
   * Verifies that a success message is displayed after modifying the cart
   * @param expectedMessage
   */
  @step('Verifying that a success message is displayed after modifying the cart')
  async verifyCartModifiedSuccessMessage(expectedMessage: string): Promise<void> {
    await this.assertHelper.assertElementContainsText(this.divCartModifiedSuccessMessage, expectedMessage);
  }

  /**
   * Verifies updated product quantity and its total in the cart
   * @param product 
   * @param expectedMessage 
   */
  @step('Verifying updated product quantity and its total')
  async verifyUpdatedProductQuantity(product: Product): Promise<void> {
    const totalText = await this.commonPage.innerText(this.cellTotal(product.name));
    const actualTotal = Currency.parseCurrency(totalText);
    const expectedTotal = product.price * product.quantity;
    Assertions.assertEqual(actualTotal, expectedTotal, `Expected updated total for ${product.name} to be ${expectedTotal}`);
    await this.assertHelper.assertElementHasValue(this.inputQuantity(product.name), product.quantity.toString());
  }
}
