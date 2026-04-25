import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/**
 * Class representing register locators
 */
export class RegisterLocators extends CommonLocators {
  /**
   * Creates an instance of RegisterLocators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.locatorsInitialization();
  }

  inputFirstName!: Locator;
  inputLastName!: Locator;
  inputEmail!: Locator;
  inputTelephone!: Locator;
  inputPassword!: Locator;
  inputPasswordConfirm!: Locator;
  radioNewsletterYes!: Locator;
  radioNewsletterNo!: Locator;
  chkPrivacyPolicy!: Locator;
  btnContinue!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputFirstName = this.page.locator('#input-firstname');
    this.inputLastName = this.page.locator('#input-lastname');
    this.inputEmail = this.page.locator('#input-email');
    this.inputTelephone = this.page.locator('#input-telephone');
    this.inputPassword = this.page.locator('#input-password');
    this.inputPasswordConfirm = this.page.locator('#input-confirm');
    this.radioNewsletterYes = this.page.locator(
      'input[name="newsletter"][value="1"]',
    );
    this.radioNewsletterNo = this.page.locator(
      'input[name="newsletter"][value="0"]',
    );
    this.chkPrivacyPolicy = this.page.locator('//label[@for="input-agree"]');
    this.btnContinue = this.page.locator('input[value="Continue"]');
  }
}
