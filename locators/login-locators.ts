import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class LoginLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  inputUser!: Locator;
  inputPassword!: Locator;
  flashMessage!: Locator;
  submitButton!: Locator;
  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputUser = this.page.locator('input[name="email"]');
    this.inputPassword = this.page.locator('input[name="password"]');
    this.submitButton = this.page.locator('input[type="submit"]'); // FIX
    this.flashMessage = this.page.locator('.alert')
  }
}
