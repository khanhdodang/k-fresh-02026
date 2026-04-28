import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class HomeLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  wishListIcon!: Locator;
  productCards!: Locator;
  productNames!: Locator;

  successAlert!: Locator;
  successAlertMessage!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.productCards = this.page.locator("//div[contains(@class,'product-thumb')]");
    this.productNames = this.page.locator("//div[contains(@class,'product-thumb')]//h4/a");
    this.wishListIcon = this.page.locator("//a[@aria-label='Wishlist']");
    this.successAlert = this.page.locator("//div[@id='notification-box-top']//*[@role='alert']");
    this.successAlertMessage = this.page.locator("//div[@id='notification-box-top']//div[contains(@class,'toast-body')]");
  }

  getAddToWishlistButton(index: number): Locator {
    return this.productCards
      .nth(index)
      .locator("xpath=.//button[@title='Add to Wish List']");
  }

  getProductNameByIndex(index: number): Locator {
    return this.productNames.nth(index);
  }
}
