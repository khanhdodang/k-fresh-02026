import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class RegisterLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  inputFirstName!: Locator;
  inputLastName!: Locator;
  inputEmail!: Locator;
  inputTelephone!: Locator;
  inputPassword!: Locator;
  inputConfirmPassword!: Locator;

  radioNewsletterYes!: Locator;
  radioNewsletterNo!: Locator;

  inputAgree!: Locator;
  btnContinue!: Locator;

  chkPrivacyPolicy!: Locator;

  successMessage!: Locator;
  successPageContent!: Locator;

  // Error messages
  errorFirstName!: Locator;
  errorLastName!: Locator;
  errorEmail!: Locator;
  errorTelephone!: Locator;
  errorPassword!: Locator;
  errorConfirmPassword!: Locator;
  errorAgree!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputFirstName = this.page.locator('#input-firstname');
    this.inputLastName = this.page.locator('#input-lastname');
    this.inputEmail = this.page.locator('#input-email');
    this.inputTelephone = this.page.locator('#input-telephone');
    this.inputPassword = this.page.locator('#input-password');
    this.inputConfirmPassword = this.page.locator('#input-confirm');
    this.radioNewsletterYes = this.page.locator('input[name="newsletter"][value="1"]');
    this.radioNewsletterNo = this.page.locator('input[name="newsletter"][value="0"]');
    this.chkPrivacyPolicy = this.page.locator('//label[@for="input-agree"]');
    this.btnContinue = this.page.locator('input[value="Continue"]');

    this.successMessage = this.page.locator('#content h1');
    this.successPageContent = this.page.locator('#content');
    this.errorFirstName = this.page.locator('#input-firstname + .text-danger');
    this.errorLastName = this.page.locator('#input-lastname + .text-danger');
    this.errorEmail = this.page.locator('#input-email + .text-danger');
    this.errorTelephone = this.page.locator('#input-telephone + .text-danger');
    this.errorPassword = this.page.locator('#input-password + .text-danger');
    this.errorConfirmPassword = this.page.locator('#input-confirm + .text-danger');
    this.errorAgree = this.page.locator('.alert-danger');
  }
}
