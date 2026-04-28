import { expect, Page, Locator } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CheckoutLocators } from '../locators/checkout-locators';
import { Address } from '../models/address';
import { UserProfile } from '../models/user';
import { Currency } from '../utilities/currency';
import { Logger } from '../utilities/logger';

/**
 * Page Object Model for the Checkout Page.
 * Contains methods to interact with the checkout process, including address forms,
 * payment/shipping methods, and order confirmation.
 */
export class CheckoutPage extends CheckoutLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Finalizes the order by clicking the confirmation button.
   * Redirects to the confirm success state.
   */
  @step('Click Place Order Button')
  async clickPlaceOrderButton(): Promise<void> {
    await this.btnConfirmOrder.click({ force: true });
    await expect(this.page).toHaveURL(/.*checkout\/confirm/, { timeout: Constants.TIMEOUTS.PAGE_EVENT_LOAD });
  }

  /**
   * Checks the "Terms and Conditions" and proceeds to the next step.
   * This handles the transitional state between filling details and finalizing the order.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.chkAgreeTerms.scrollIntoViewIfNeeded();
    await this.chkAgreeTerms.click({ force: true });
    await this.btnSaveCheckout.scrollIntoViewIfNeeded();
    await this.btnSaveCheckout.click({ force: true });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Clicks the primary "Continue" button used across various accordion sections of the checkout.
   */
  @step('Click Continue Button')
  async clickContinueButton(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.commonPage.scrollTo(this.btnContinueGeneric);
    await this.commonPage.click(this.btnContinueGeneric);
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Stub method to retrieve the current product list in the checkout summary.
   * @returns {Promise<string[]>} An empty array (to be implemented).
   */
  @step('Get Product List')
  async getProductList(): Promise<string[]> {
    return [];
  }

  /**
   * Stub method to remove a specific product from the checkout.
   * @param {string} _productName Name of the product to remove.
   */
  @step('Remove Product from Checkout')
  async removeProductFromCheckout(_productName: string): Promise<void> {
    Logger.info(`Stub action: Preparing to remove ${_productName} from cart...`);
  }

  /**
   * Updates the item quantity directly within the checkout summary table.
   * @param {string} _productName Name of the product.
   * @param {number} quantity The new quantity value.
   */
  @step('Update Product Quantity')
  async updateProductQuantity(_productName: string, quantity: number): Promise<void> {
    await this.inputQty.fill(quantity.toString());
    await this.btnUpdateQty.click();
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.DOM_CONTENT_LOADED);
  }

  /**
   * Populates the Billing Address form using a new address entry.
   * @param {UserProfile} user The user profile containing name and contact info.
   * @param {Address} address The address details for billing.
   */
  @step('Fill Billing Details (New Address)')
  async fillBillingDetails(user: UserProfile, address: Address): Promise<void> {
    if (await this.radioBillingNewAddress.isVisible()) {
      await this.radioBillingNewAddress.click({ force: true });
      await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    }

    await this.inputBillingFirstName.fill(user.firstName);
    await this.inputBillingLastName.fill(user.lastName);

    await this.inputBillingAddress1.fill(address.street);
    await this.inputBillingCity.fill(address.city);

    await this.ddlBillingCountry.selectOption('230');
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.PERFORM_LOADING * 1000);
    await this.ddlBillingZone.selectOption({ index: 1 });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Populates the Shipping Address form by opting out of the "Same as Billing" default.
   * @param {UserProfile} user The user profile details.
   * @param {Address} address The physical shipping destination.
   */
  @step('Fill Shipping Details (New Address)')
  async fillShippingDetails(user: UserProfile, address: Address): Promise<void> {
    await this.chkSameAddress.uncheck({ force: true });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);

    if (await this.radioShippingNewAddress.isVisible()) {
      await this.radioShippingNewAddress.click({ force: true });
      await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    }

    await this.inputShippingFirstName.fill(user.firstName);
    await this.inputShippingLastName.fill(user.lastName);

    await this.inputShippingAddress1.fill(address.street);
    await this.inputShippingCity.fill(address.city);

    await this.ddlShippingCountry.selectOption('230');
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.PERFORM_LOADING * 1000);
    await this.ddlShippingZone.selectOption({ index: 1 });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Opts for an existing billing address and ensures the shipping section is collapsed.
   */
  @step('Select Existing Billing Address and Hide Shipping')
  async useExistingAddressAndHideShipping(): Promise<void> {
    if (await this.radioBillingExistingAddress.isVisible()) {
      await this.radioBillingExistingAddress.click({ force: true });
      await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    }
    await this.chkSameAddress.check({ force: true });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    await expect(this.divShippingNewBlock).toBeHidden();
  }

  /**
   * Asserts that the default shipping and payment methods are selected and visible.
   */
  @step('Verify Default Delivery and Payment Methods')
  async verifyDefaultDeliveryAndPayment(): Promise<void> {
    await this.radioFlatShippingRate.scrollIntoViewIfNeeded();
    await expect(this.radioFlatShippingRate).toBeVisible();
    await this.radioCashOnDelivery.scrollIntoViewIfNeeded();
    await expect(this.radioCashOnDelivery).toBeVisible();
  }

  /**
   * Resets the billing form inputs to an empty state to prepare for validation testing.
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
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Validates the presence of mandatory field error messages in the Billing section.
   */
  @step('Verify Billing Validation Errors')
  async verifyBillingValidationErrors(): Promise<void> {
    await expect(this.lblErrorBillingFirstName).toBeVisible({ timeout: Constants.TIMEOUTS.WAIT_ELEMENT_VISIBLE });
    await expect(this.lblErrorBillingLastName).toBeVisible();
  }

  /**
   * Helper to fetch and parse a currency value from a UI element.
   * @param {any} locator The locator containing the price text.
   * @param {string} stepLogName Descriptive label for logging.
   * @returns {Promise<number>} The parsed numeric price value.
   */
  @step('Extract Price Value by Label')
  async getPriceValue(locator: Locator, stepLogName: string): Promise<number> {
    let text = '';
    if (await locator.isVisible({ timeout: Constants.TIMEOUTS.WAIT_ELEMENT_INVISIBLE }).catch(() => false)) {
      text = await locator.innerText();
    } else {
      Logger.error(`Could not locate or read price value for: ${stepLogName}`);
    }
    return Currency.parseCurrency(text);
  }

  /**
   * Calculates the product unit price based on the current subtotal and quantity.
   * @returns {Promise<number>} Unit price calculation result.
   */
  @step('Calculate Initial Unit Price from Sub-Total')
  async calculateInitialUnitPrice(): Promise<number> {
    await this.inputQty.waitFor({ state: 'visible' });
    const initialSubTotal = await this.getPriceValue(this.valSubTotal, 'Sub-Total');
    const initialQty = parseInt(await this.inputQty.inputValue());
    return initialSubTotal / initialQty;
  }

  /**
   * Performs arithmetic verification of total calculations (Quantity * UnitPrice + Shipping).
   * @param {number} quantity Expected item count.
   * @param {number} unitPrice Base price per item.
   */
  @step('Verify Math accuracy of Cart Totals')
  async verifyCartTotals(quantity: number, unitPrice: number): Promise<void> {
    const newSubTotal = await this.getPriceValue(this.valSubTotal, 'Sub-Total');
    expect(newSubTotal).toBeCloseTo(unitPrice * quantity, 1);

    const flatShipping = await this.getPriceValue(this.valFlatShipping, 'Flat Shipping Rate');
    const total = await this.getPriceValue(this.valTotal, 'Total');
    expect(total).toBeCloseTo(newSubTotal + flatShipping, 1);
  }

  /**
   * Toggles the "Same Address" checkbox to hide the Shipping details section.
   */
  @step('Check Same Address Checkbox to hide section')
  async verifyInitialShippingSectionHidden(): Promise<void> {
    await this.chkSameAddress.check({ force: true });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    await expect(this.divShippingNewBlock).toBeHidden();
  }

  /**
   * Toggles the "Same Address" checkbox to reveal the Shipping details section.
   */
  @step('Uncheck Same Address Checkbox to reveal section')
  async verifyShippingSectionVisible(): Promise<void> {
    await this.chkSameAddress.uncheck({ force: true });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    await expect(this.divShippingNewBlock).toBeVisible();
  }

  /**
   * Injects a custom comment into the order notes field.
   * @param {string} commentText The instruction or note to add.
   */
  @step('Add Order Comment')
  async addOrderComment(commentText: string): Promise<void> {
    await this.inputComment.fill(commentText);
  }

  /**
   * Accepts terms and submits the section to proceed.
   */
  @step('Accept Terms and Continue')
  async acceptTermsAndContinue( ): Promise<void> {
    await this.chkAgreeTerms.scrollIntoViewIfNeeded();
    await this.chkAgreeTerms.check({ force: true });
    await this.btnSaveCheckout.click();
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Clicks the final confirmation button and asserts successful navigation to the success page.
   */
  @step('Confirm Order and Verify Success')
  async confirmOrderAndVerifySuccess(): Promise<void> {
    await this.btnConfirmOrder.click();
    await expect(this.page).toHaveURL(/.*checkout\/success/, { timeout: Constants.TIMEOUTS.PAGE_EVENT_LOAD });
  }

  /**
   * Resets the shipping address form inputs.
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
   * Validates mandatory field error messages in the Shipping section.
   */
  @step('Verify Shipping Validation Errors')
  async verifyShippingValidationErrors(): Promise<void> {
    await expect(this.lblErrorShippingFirstName).toBeVisible();
    await expect(this.lblErrorShippingLastName).toBeVisible();
  }

  /**
   * Selects an existing billing address from the saved address book.
   */
  @step('Select Existing Billing Address')
  async selectExistingBillingAddress(): Promise<void> {
    if (await this.radioBillingExistingAddress.isVisible()) {
      await this.radioBillingExistingAddress.click({ force: true });
      await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    }
  }

  /**
   * Verifies the UI logic that toggles input fields when switching between new/existing addresses.
   */
  @step('Verify Shipping Form Toggle')
  async verifyShippingFormToggle(): Promise<void> {
    await this.radioShippingNewAddress.check({ force: true });
    await expect(this.inputShippingFirstName).toBeVisible();

    await this.radioShippingExistingAddress.check({ force: true });
    await expect(this.inputShippingFirstName).toBeHidden();
  }

  /**
   * Final verification ensuring the shipping block is hidden after user interaction.
   */
  @step('Verify Shipping Section Hidden Again')
  async verifyShippingSectionHiddenAgain(): Promise<void> {
    await this.chkSameAddress.check({ force: true });
    await expect(this.divShippingNewBlock).toBeHidden();
  }

  /**
   * Sets the "Terms and Conditions" checkbox state based on the provided boolean value. 
   * @param flag Determines whether to check or uncheck the terms and conditions checkbox.
   */
  @step('Set Terms and Conditions Checkbox')
  async setTermsAndConditions(flag: boolean = true): Promise<void> {
    await this.commonPage.scrollTo(this.chkAgreeTerms);
    const currentlyChecked = await this.chkAgreeTerms.isChecked();

    if (flag && !currentlyChecked) {
      await this.commonPage.click(this.chkAgreeTerms);
    } else if (!flag && currentlyChecked) {
      await this.commonPage.click(this.chkAgreeTerms);
    }
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }

  /**
   * Asserts that the warning message for unaccepted terms and conditions is displayed, preventing order confirmation.
   */
  @step('Verify Terms Warning Message')
  async verifyTermsWarningMessage(): Promise<void> {
    await expect(this.alertWarning).toBeVisible({
      timeout: Constants.TIMEOUTS.WAIT_ELEMENT_VISIBLE
    });
  }

  /**
   * Asserts that the "Same Address" checkbox is selected, confirming the billing and shipping sections are linked.
   */
  @step('Verify Same Address Checkbox is Checked')
  async verifySameAddressIsChecked(): Promise<void> {
    await expect(this.chkSameAddress).toBeChecked();
  }

  /** 
   * Selects a country from the billing country dropdown and triggers the API load for zones.
   * @param countryName The name of the country to select.
   */
  @step('Select Billing Country and trigger API load')
  async selectBillingCountry(countryName: string): Promise<void> {
    await this.commonPage.scrollTo(this.ddlBillingCountry);
    await this.ddlBillingCountry.selectOption({ label: countryName });
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.PERFORM_LOADING * 1000);
  }

  /** 
   * Verifies that the zone dropdown contains a specific state/province.
   * @param expectedZone The name of the zone to verify.
   */
  @step('Verify Zone Dropdown Contains Specific State')
  async verifyZoneContains(expectedZone: string): Promise<void> {
    await this.ddlBillingZone.waitFor({ state: 'visible' });
    const zoneOptionsText = await this.ddlBillingZone.innerText();
    expect(zoneOptionsText).toContain(expectedZone);
  }

  /** 
   * Toggles the "Same Address" checkbox based on the provided boolean value.
   * @param check Determines whether to check or uncheck the checkbox.
   */
  @step('Toggle "Same Address" Checkbox')
  async toggleSameAddressCheckbox(check: boolean): Promise<void> {
    await this.commonPage.scrollTo(this.chkSameAddress);
    const isChecked = await this.chkSameAddress.isChecked();
    if (check && !isChecked) {
      await this.commonPage.click(this.chkSameAddress);
    }
    else if (!check && isChecked) {
      await this.commonPage.click(this.chkSameAddress);
    }
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
  }
}
