import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

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
    this.inputUsername = this.page.locator("#username");
    this.inputPassword = this.page.locator("#password");
    this.flashMessage = this.page.locator("#flash");
  }
}
