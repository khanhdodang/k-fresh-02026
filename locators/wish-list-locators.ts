import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class WishListLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  successMessage!: Locator;
  emptyMessage!: Locator;
  wishlistRows!: Locator;
  firstProductName!: Locator;

  getRowByIndex!: (rowIndex: number) => Locator;
  getRowByProductName!: (productName: string) => Locator;
  getProductLink!: (productName: string) => Locator;

  getActionCellByRow!: (rowIndex: number) => Locator;
  getRemoveButtonByRow!: (rowIndex: number) => Locator;
  getAddButtonByRow!: (rowIndex: number) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();

    this.successMessage = this.page.locator("div.alert-success");
    this.emptyMessage = this.page.locator("text=Your wish list is empty");
    this.wishlistRows = this.page.locator("#content table tbody tr");

    this.firstProductName = this.wishlistRows.nth(0).locator("td.text-left a");

    this.getRowByIndex = (rowIndex: number): Locator =>
      this.wishlistRows.nth(rowIndex);

    this.getRowByProductName = (productName: string): Locator =>
      this.page.locator(`//table//a[contains(text(),'${productName}')]/ancestor::tr`);

    this.getProductLink = (productName: string): Locator =>
      this.page.locator(
        `//tr[.//a[normalize-space()='${productName}']]//td[@class='text-left']/a`
      );

    // 👇 ACTION CELL (quan trọng)
    this.getActionCellByRow = (rowIndex: number): Locator =>
      this.getRowByIndex(rowIndex).locator("td.text-right.text-nowrap");

    this.getRemoveButtonByRow = (rowIndex: number): Locator =>
      this.getRowByIndex(rowIndex).locator("//a[i[contains(@class,'fa-times')]]");

    this.getAddButtonByRow = (rowIndex: number): Locator =>
      this.getRowByIndex(rowIndex).locator("button[data-original-title='Add to Cart']");
  }

  // 👇 ĐƯA LOGIC HOVER VÀO LOCATOR (QUAN TRỌNG)
  async hoverRowAction(rowIndex: number): Promise<void> {
    await this.getActionCellByRow(rowIndex).hover();
  }
}