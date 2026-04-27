import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class CartLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  btnCart!: Locator;
  divCartDrawerMessage!: Locator;
  spanCartDrawerTotalLabel!: Locator;
  pMainCartMessage!: Locator;
  divCartModifiedSuccessMessage!: Locator;
  btnRemoveItems!: Locator;
  rowProduct!: (productName: string) => Locator;
  btnRemove!: (productName: string) => Locator;
  btnUpdate!: (productName: string) => Locator;
  inputQuantity!: (productName: string) => Locator;
  cellTotal!: (productName: string) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnCart = this.page.locator('(//div[@class="cart-icon"])[1]');
    this.divCartDrawerMessage = this.page.locator(
      '//div[contains(@class,"widget-total")]',
    );
    this.spanCartDrawerTotalLabel = this.page.locator(
      '//td[text()="Total:"]/following-sibling::td/strong',
    );
    this.pMainCartMessage = this.page.locator(
      '//h1[contains(@class,"page-title")]/following-sibling::p',
    );
    this.divCartModifiedSuccessMessage = this.page
      .locator('//div[@class="alert alert-success alert-dismissible"]')
      .first();
    this.btnRemoveItems = this.page.locator('button[title="Remove"]');
    this.rowProduct = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..)[1]`);
    this.btnRemove = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..//button[@title="Remove"])[1]`);
    this.btnUpdate = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..//button[@title="Update"])[1]`);
    this.inputQuantity = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..//input[starts-with(@name,'quantity')])[1]`);
    this.cellTotal = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..//td)[last()]`);
  }
}
