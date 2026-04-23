import test, { Page } from "@playwright/test";
import { CommonLocators } from "../locators/common-locators";
import { step } from "../utilities/logging";

export class CommonPage extends CommonLocators {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the specified URL.
   * @param url The URL to navigate to.
   */
  @step("Navigate to url")
  async goto(url: string): Promise<void> {
    await test.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }
}
