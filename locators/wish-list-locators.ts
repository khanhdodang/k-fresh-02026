import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class WishListLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  addButton!: Locator;
  removeButton!: Locator;
  successMessage!: Locator;
  emptyMessage!: Locator;

  getRowByProductName!: (productName: string) => Locator;
  getProductLink!: (productName: string) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();

    this.addButton = this.page.locator("//button[@data-original-title='Add to Cart']");
    this.removeButton = this.page.locator("//a[@data-original-title='Remove']");
    this.successMessage = this.page.locator("//div[contains(@class,'alert-success')]");
    this.emptyMessage = this.page.locator("//p[contains(text(),'Your wish list is empty')]");

    this.getRowByProductName = (productName: string): Locator =>
      this.page.locator(`//a[text()='${productName}']/ancestor::tr`);

    this.getProductLink = (productName: string): Locator =>
      this.page.locator(`//table[contains(@class,'table')]//a[text()='${productName}']`);
  }
}