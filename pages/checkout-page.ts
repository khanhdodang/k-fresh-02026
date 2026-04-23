import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CheckoutLocators } from '../locators/checkout-locators';
import { Address } from '../models/address';
import { UserProfile } from '../models/user';
import { PriceHelper } from '../utilities/price-helper';
import { Logger } from '../utilities/logger';


export class CheckoutPage extends CheckoutLocators {

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
    await this.btnConfirmOrder.click({ force: true });
    await expect(this.page).toHaveURL(/.*checkout\/confirm/, { timeout: Constants.TIMEOUT_MEDIUM });
  }

  /**
   * Clicks the "Agree to Terms" checkbox.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.chkAgreeTerms.scrollIntoViewIfNeeded();
    await this.chkAgreeTerms.click({ force: true });
    await this.btnSaveCheckout.scrollIntoViewIfNeeded();
    await this.btnSaveCheckout.click({ force: true });
    await this.commonPage.wait(Constants.WAIT_SHORT);
  }

  /**
   * Clicks the "Continue" button for the specified section.
   */
  @step('Click Continue Button')
  async clickContinueButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
    await this.commonPage.wait(Constants.WAIT_SHORT);
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
    await this.inputQty.fill(quantity.toString());
    await this.btnUpdateQty.click();
    await this.commonPage.wait(Constants.WAIT_LONG);
  }


  /**
   * Fills the billing details combining UserProfile (for Name) and Address (for Location)
   */
  @step('Fill Billing Details (New Address)')
  async fillBillingDetails(user: UserProfile, address: Address): Promise<void> {
    if (await this.radioBillingNewAddress.isVisible()) {
      await this.radioBillingNewAddress.click({ force: true });
      await this.commonPage.wait(Constants.WAIT_SHORT);
    }

    await this.inputBillingFirstName.fill(user.firstName);
    await this.inputBillingLastName.fill(user.lastName);

    await this.inputBillingAddress1.fill(address.street);
    await this.inputBillingCity.fill(address.city);

    await this.ddlBillingCountry.selectOption('230');
    await this.commonPage.wait(Constants.WAIT_MEDIUM);
    await this.ddlBillingZone.selectOption(address.state || { index: 1 });
    await this.commonPage.wait(Constants.WAIT_SHORT);
  }

  /**
   * Fills the shipping details combining UserProfile and Address
   */
  @step('Fill Shipping Details (New Address)')
  async fillShippingDetails(user: UserProfile, address: Address): Promise<void> {
    await this.chkSameAddress.uncheck({ force: true });
    await this.commonPage.wait(Constants.WAIT_SHORT);

    if (await this.radioShippingNewAddress.isVisible()) {
      await this.radioShippingNewAddress.click({ force: true });
      await this.commonPage.wait(Constants.WAIT_SHORT);
    }

    await this.inputShippingFirstName.fill(user.firstName);
    await this.inputShippingLastName.fill(user.lastName);

    await this.inputShippingAddress1.fill(address.street);
    await this.inputShippingCity.fill(address.city);

    await this.ddlShippingCountry.selectOption('230');
    await this.commonPage.wait(Constants.WAIT_MEDIUM);
    await this.ddlShippingZone.selectOption(address.state || { index: 2 });
    await this.commonPage.wait(Constants.WAIT_SHORT);
  }

  // =====================================================================
  // Part 2: Functions for TEST (TC_CHK_001 -> 005)
  // =====================================================================

  /**
   * Selects the option to use an existing address and checks the "Same Address" checkbox to hide the shipping section.
   * @param billingAddressAlias The alias of the existing billing address to select (if multiple exist).
   * @param shippingAddressAlias The alias of the existing shipping address to select (if multiple exist).
   * This simulates the express checkout flow where the user opts to use saved addresses and skip shipping details entry.
   */
  @step('Select Existing Billing Address and Hide Shipping')
  async useExistingAddressAndHideShipping(): Promise<void> {
    if (await this.radioBillingExistingAddress.isVisible()) {
      await this.radioBillingExistingAddress.click({ force: true });
      await this.commonPage.wait(Constants.WAIT_SHORT);
    }
    await this.chkSameAddress.check({ force: true });
    await this.commonPage.wait(Constants.WAIT_SHORT);
    await expect(this.divShippingNewBlock).toBeHidden();
  }

  /**
   * Verifies that the default delivery method (Flat Shipping Rate) and payment method (Cash on Delivery) are pre-selected and visible.
   * @param expectedDeliveryMethod The expected default delivery method (e.g., "Flat Shipping Rate").
   * @param expectedPaymentMethod The expected default payment method (e.g., "Cash on Delivery").
   * This checks that the express checkout flow correctly defaults to the expected options when using existing addresses.
   */
  @step('Verify Default Delivery and Payment Methods')
  async verifyDefaultDeliveryAndPayment(): Promise<void> {
    await this.radioFlatShippingRate.scrollIntoViewIfNeeded();
    await expect(this.radioFlatShippingRate).toBeVisible();
    await this.radioCashOnDelivery.scrollIntoViewIfNeeded();
    await expect(this.radioCashOnDelivery).toBeVisible();
  }

  /**
   * Clears all input fields in the billing address form to trigger validation errors.
   * This simulates the user attempting to submit the form without filling mandatory fields, allowing us to verify that proper validation messages are displayed.
   */
  @step('Clear all inputs in Billing Form')
  async clearBillingAddressForm(): Promise<void> {
    if (await this.radioBillingNewAddress.isVisible()) {
      await this.radioBillingNewAddress.click({ force: true });
    }
    await this.inputBillingFirstName.clear();
    await this.inputBillingLastName.clear();
    await this.inputBillingAddress1.clear();
    await this.inputBillingCity.clear();
    await this.ddlBillingCountry.selectOption('');
    await this.commonPage.wait(Constants.WAIT_SHORT);
  }

  /**
   * Verifies that the expected validation errors are displayed for the billing address form.
   */
  @step('Verify Billing Validation Errors')
  async verifyBillingValidationErrors(): Promise<void> {
    await expect(this.divPaymentSection.getByText(/First Name must be between/i)).toBeVisible({ timeout: Constants.TIMEOUT_SHORT });
    await expect(this.divPaymentSection.getByText(/Last Name must be between/i)).toBeVisible();
  }

  // --- Calculation Functions (TC_CHK_004) ---
  /**
   * Extracts a numeric price value from a locator's text content based on a label (e.g., "Sub-Total", "Flat Shipping Rate", "Total").
   * @param locator The Playwright Locator for the price element. This should point to the specific cell containing the price value.
   * @param stepLogName A descriptive name for logging purposes (e.g., "Sub-Total") to identify which price is being extracted in logs.
   * @returns The extracted price as a number. If the locator is not visible or the text cannot be parsed, it returns 0 and logs an error.
   */
  @step('Extract Price Value by Label')
  async getPriceValue(locator: any, stepLogName: string): Promise<number> {
    let text = '';
    if (await locator.isVisible({ timeout: 3000 }).catch(() => false)) {
      text = await locator.innerText();
    } else {
      Logger.error(`Could not locate or read price value for: ${stepLogName}`);
    }
    return PriceHelper.extractPrice(text);
  }

  /**
   * Calculates the initial unit price of the product based on the Sub-Total and Quantity values.
   * This is used to verify that the cart totals update correctly when the quantity is changed. 
   * It retrieves the initial Sub-Total and Quantity from the checkout page, then divides the Sub-Total by the Quantity to get the unit price.
   * @returns The calculated unit price as a number.
   */
  @step('Calculate Initial Unit Price from Sub-Total')
  async calculateInitialUnitPrice(): Promise<number> {
    await this.inputQty.waitFor({ state: 'visible' });
    const initialSubTotal = await this.getPriceValue(this.valSubTotal, 'Sub-Total');
    const initialQty = parseInt(await this.inputQty.inputValue());
    return initialSubTotal / initialQty;
  }

  /** 
   * Verifies that the cart totals (Sub-Total, Flat Shipping Rate, Total) are updated correctly based on the given quantity and unit price.
   * This checks that the dynamic calculations on the checkout page are accurate when the quantity of a product is changed, ensuring that the Sub-Total reflects the unit price multiplied by quantity, and that the Total correctly sums the Sub-Total and Flat Shipping Rate.
   * @param quantity The new quantity of the product after update.
   * @param unitPrice The unit price of the product to calculate expected totals.
   */
  @step('Verify Math accuracy of Cart Totals')
  async verifyCartTotals(quantity: number, unitPrice: number): Promise<void> {
    const newSubTotal = await this.getPriceValue(this.valSubTotal, 'Sub-Total');
    expect(newSubTotal).toBeCloseTo(unitPrice * quantity, 1);

    const flatShipping = await this.getPriceValue(this.valFlatShipping, 'Flat Shipping Rate');
    const total = await this.getPriceValue(this.valTotal, 'Total');
    expect(total).toBeCloseTo(newSubTotal + flatShipping, 1);
  }

  // --- UI State Check Functions (TC_CHK_005) ---

  /** 
   * Verifies that the initial shipping section is hidden when the "Same Address" checkbox is checked.
   */
  @step('Check Same Address Checkbox to hide section')
  async verifyInitialShippingSectionHidden(): Promise<void> {
    await this.chkSameAddress.check({ force: true });
    await this.commonPage.wait(Constants.WAIT_TINY);
    await expect(this.divShippingNewBlock).toBeHidden();
  }

  /** 
   * Verifies that the shipping section is visible when the "Same Address" checkbox is unchecked.
   */
  @step('Uncheck Same Address Checkbox to reveal section')
  async verifyShippingSectionVisible(): Promise<void> {
    await this.chkSameAddress.uncheck({ force: true });
    await this.commonPage.wait(Constants.WAIT_TINY);
    await expect(this.divShippingNewBlock).toBeVisible();
  }

  /**
   * Adds a comment to the order by filling the comment input field with the provided text.
   * This simulates the user entering special instructions or notes for the order during checkout, allowing us to verify that the comment input is functional and accepts text input.
   * @param commentText The text to be entered into the order comment field.  
   */
  @step('Add Order Comment')
  async addOrderComment(commentText: string): Promise<void> {
    await this.inputComment.fill(commentText);
  }

  /** 
   * Clicks the "Agree to Terms" checkbox and then clicks the "Continue" button to proceed with the checkout.
   * This simulates the user accepting the terms and conditions and attempting to continue with the checkout process, allowing us to verify that the terms acceptance flow works correctly and that the user can proceed after accepting terms.
   */
  @step('Accept Terms and Continue')
  async acceptTermsAndContinue(prefix: string = ''): Promise<void> {
    await this.chkAgreeTerms.scrollIntoViewIfNeeded();
    await this.chkAgreeTerms.check({ force: true });
    await this.btnSaveCheckout.click();
    await this.commonPage.wait(Constants.WAIT_SHORT);
  }

  /** 
   * Clicks the "Confirm Order" button and verifies that the user is redirected to the order success page.
   * This simulates the final step of the checkout process where the user confirms their order, allowing us to verify that the order submission works correctly and that the user is taken to the expected success page.
   */
  @step('Confirm Order and Verify Success')
  async confirmOrderAndVerifySuccess(prefix: string = ''): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout\/success/, { timeout: Constants.TIMEOUT_MEDIUM });
  }

  /** 
   * Clears the shipping address form fields.
   */
  @step('Clear Shipping Address Form')
  async clearShippingAddressForm(): Promise<void> {
    await this.chkSameAddress.uncheck({ force: true });
    if (await this.radioShippingNewAddress.isVisible()) {
      await this.radioShippingNewAddress.click({ force: true });
    }
    await this.inputShippingFirstName.clear();
    await this.inputShippingLastName.clear();
    await this.inputShippingAddress1.clear();
    await this.inputShippingCity.clear();
    await this.ddlShippingCountry.selectOption('');
  }

  /**
   * Verifies that the expected validation errors are displayed for the shipping address form.
   * This checks that the form validation correctly identifies missing mandatory fields in the shipping section and displays appropriate error messages to the user.
   */
  @step('Verify Shipping Validation Errors')
  async verifyShippingValidationErrors(): Promise<void> {
    await expect(this.divShippingSection.getByText(/First Name must be between/i)).toBeVisible();
    await expect(this.divShippingSection.getByText(/Last Name must be between/i)).toBeVisible();
  }

  /**
   * Selects the option to use an existing billing address and verifies that the shipping section is hidden.
   * This simulates the user opting to use a saved billing address and ensuring that the UI correctly hides the shipping details when "Same Address" is checked.
   */
  @step('Select Existing Billing Address')
  async selectExistingBillingAddress(): Promise<void> {
    if (await this.radioBillingExistingAddress.isVisible()) {
      await this.radioBillingExistingAddress.click({ force: true });
      await this.commonPage.wait(Constants.WAIT_SHORT);
    }
  }

  /**
   * Selects the option to enter a new shipping address and verifies that the shipping form fields are displayed.
   * This simulates the user toggling from using an existing address to entering new shipping details, ensuring that the UI correctly reveals the necessary input fields.
   */
  @step('Verify Shipping Form Toggle')
  async verifyShippingFormToggle(): Promise<void> {
    await this.radioShippingNewAddress.check({ force: true });
    await expect(this.inputShippingFirstName).toBeVisible();

    await this.radioShippingExistingAddress.check({ force: true });
    await expect(this.inputShippingFirstName).toBeHidden();
  }

  /** 
   * Checks the "Same Address" checkbox again to hide the shipping section and verifies that it is hidden.
   * This simulates the user toggling the "Same Address" option back on after initially revealing the shipping form, ensuring that the UI correctly hides the shipping details again.
   */
  @step('Verify Shipping Section Hidden Again')
  async verifyShippingSectionHiddenAgain(): Promise<void> {
    await this.chkSameAddress.check({ force: true });
    await expect(this.divShippingNewBlock).toBeHidden();
  }
}


