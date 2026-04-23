import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class HomeLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  addButtons!: Locator;
  wishListIcon!: Locator;
  productCards!: Locator;
  locatorInitialization(): void {
    super.locatorInitialization();
    this.productCards = this.page.locator("//div[contains(@class,'product-thumb')]",);
    this.wishListIcon = this.page.locator("a[aria-label='Wishlist']");
    this.addButtons = this.page.locator("//button[@title='Add to Wish List']");
  }
  getAddToWishlistButton(index: number): Locator {
    return this.productCards
      .nth(index)
      .locator("button[title='Add to Wish List']");
  }
}
