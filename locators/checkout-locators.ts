import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class CheckoutLocators extends CommonLocators {
  /**
   * Creates an instance of CheckoutLocators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.locatorsInitialization();
  }

  inputFirstName!: Locator;
  inputLastName!: Locator;
  inputCompany!: Locator;
  inputAddress1!: Locator;
  inputAddress2!: Locator;
  inputCity!: Locator;
  inputPostcode!: Locator;
  ddlCountry!: Locator;
  ddlRegion!: Locator;
  chkTerms!: Locator;
  btnContinue!: Locator;
  btnConfirmOrder!: Locator;

  /**
   * Initializes locators
   */
  locatorsInitialization(): void {
    super.locatorInitialization();
    this.inputFirstName = this.page.locator('#input-payment-firstname');
    this.inputLastName = this.page.locator('#input-payment-lastname');
    this.inputCompany = this.page.locator('#input-payment-company');
    this.inputAddress1 = this.page.locator('#input-payment-address-1');
    this.inputAddress2 = this.page.locator('#input-payment-address-2');
    this.inputCity = this.page.locator('#input-payment-city');
    this.inputPostcode = this.page.locator('#input-payment-postcode');
    this.ddlCountry = this.page.locator('#input-payment-country');
    this.ddlRegion = this.page.locator('#input-payment-zone');
    this.chkTerms = this.page.locator('//label[@for=\'input-agree\']');
    this.btnContinue = this.page.locator('#button-save');
    this.btnConfirmOrder = this.page.locator('#button-confirm');
  }
}
