import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/** CheckoutLocators class extends CommonLocators and defines specific locators for the checkout page of the e-commerce application.
 * It includes locators for billing and shipping sections, as well as the confirm order section.
 * This class serves as a centralized location for managing all locators related to the checkout page, allowing for easier maintenance and readability of the test code.
 */

export class CheckoutLocators extends CommonLocators {
    constructor(page: Page) {
        super(page);
        this.locatorInitialization();
    }

    // --- Billing Section ---
    divPaymentSection!: Locator;
    radioBillingNewAddress!: Locator;
    inputBillingFirstName!: Locator;
    inputBillingLastName!: Locator;
    inputBillingAddress1!: Locator;
    inputBillingCity!: Locator;
    ddlBillingCountry!: Locator;
    ddlBillingZone!: Locator;
    radioBillingExistingAddress!: Locator;

    divShippingNewBlock!: Locator;
    radioFlatShippingRate!: Locator;
    radioCashOnDelivery!: Locator;

    // --- Shipping Section ---
    divShippingSection!: Locator;
    chkSameAddress!: Locator;
    radioShippingNewAddress!: Locator;
    inputShippingFirstName!: Locator;
    inputShippingLastName!: Locator;
    inputShippingAddress1!: Locator;
    inputShippingCity!: Locator;
    ddlShippingCountry!: Locator;
    ddlShippingZone!: Locator;
    radioShippingExistingAddress!: Locator;

    // --- Confirm Section ---
    btnSaveCheckout!: Locator;
    btnConfirmOrder!: Locator;

    inputComment!: Locator;

    formPaymentNew!: Locator;
    formShippingNew!: Locator;

    inputQty!: Locator;
    btnUpdateQty!: Locator;

    valSubTotal!: Locator;
    valFlatShipping!: Locator;
    valTotal!: Locator;

    locatorInitialization() {
        super.locatorInitialization();

        // --- BILLING SECTION ---
        this.divPaymentSection = this.page.locator('#payment-address');
        this.radioBillingNewAddress = this.divPaymentSection.getByText('I want to use a new address');
        this.inputBillingFirstName = this.divPaymentSection.locator('input[name="firstname"]');
        this.inputBillingLastName = this.divPaymentSection.locator('input[name="lastname"]');
        this.inputBillingAddress1 = this.divPaymentSection.locator('input[name="address_1"]');
        this.inputBillingCity = this.divPaymentSection.locator('input[name="city"]');
        this.ddlBillingCountry = this.divPaymentSection.locator('select[name="country_id"]');
        this.ddlBillingZone = this.divPaymentSection.locator('select[name="zone_id"]');
        this.radioBillingExistingAddress = this.divPaymentSection.getByText('I want to use an existing address');

        // --- SHIPPING SECTION ---
        this.divShippingSection = this.page.locator('#shipping-address');
        this.chkSameAddress = this.page.getByText('My delivery and billing addresses are the same.');
        this.radioShippingNewAddress = this.divShippingSection.getByText('I want to use a new address');
        this.radioShippingExistingAddress = this.divShippingSection.getByText('I want to use an existing address');

        this.inputShippingFirstName = this.page.locator('#input-shipping-firstname');
        this.inputShippingLastName = this.page.locator('#input-shipping-lastname');
        this.inputShippingAddress1 = this.page.locator('#input-shipping-address-1');
        this.inputShippingCity = this.page.locator('#input-shipping-city');
        this.ddlShippingCountry = this.page.locator('#input-shipping-country');
        this.ddlShippingZone = this.page.locator('#input-shipping-zone');

        // --- CONFIRM SECTION ---
        this.btnSaveCheckout = this.page.locator('#button-save');
        this.btnConfirmOrder = this.page.getByRole('button', { name: 'Confirm Order ' });
        this.inputComment = this.page.locator('textarea[name="comment"]');

        this.divShippingNewBlock = this.page.locator('#shipping-new');
        this.radioFlatShippingRate = this.page.locator('label[for="input-shipping-method-flat.flat"]');
        this.radioCashOnDelivery = this.page.getByText('Cash On Delivery');

        this.formPaymentNew = this.page.locator('#payment-new');
        this.formShippingNew = this.page.locator('#shipping-new');

        this.inputQty = this.page.locator("input[id^='quantity_']").first();
        this.btnUpdateQty = this.inputQty.locator('xpath=ancestor::div[contains(@class, "input-group")]').locator('button').first();

        this.valSubTotal = this.page.locator('tr:has-text("Sub-Total:") >> td.text-right').last();
        this.valFlatShipping = this.page.locator('tr:has-text("Flat Shipping Rate:") >> td.text-right').last();
        this.valTotal = this.page.locator('tr:has-text("Total:") >> td.text-right').last();
    }
}