import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class LoginLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  inputEmail!: Locator;
  inputPassword!: Locator;
  btnLogin!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.inputEmail = this.page.locator(`//input[@id="input-email"]`);
    this.inputPassword = this.page.locator(`//input[@id="input-password"]`);
    this.btnLogin = this.page.locator(`//input[@value="Login"]`);
  }
}
