import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class WishListLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  locatorInitialization(): void {
    super.locatorInitialization();
  }
}
