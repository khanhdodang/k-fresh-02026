import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class LoginLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }
  
  inputUsername!: Locator;
  inputPassword!: Locator;
  flashMessage!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputUsername = this.page.locator('//input[@name="email"]');
    this.inputPassword = this.page.locator('//input[@name="password"]');
    this.flashMessage = this.page.locator('//div[@id="flash"]');
 }
}
