import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class LoginLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }
  
  inputUsername!: Locator;
  inputPassword!: Locator;
  btnLogin!: Locator;
  flashMessage!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputUsername = this.page.locator('#input-email, #username').first();
    this.inputPassword = this.page.locator('#input-password, #password').first();
    this.btnLogin = this.page.locator("input[value='Login'], button:has-text('Login')").first();
    this.flashMessage = this.page.locator('#flash, .alert-danger, .alert-success').first();
  }
}
