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
  miniCartDrawer!: Locator;
  btnViewCart!: Locator;
  lnkCheckout!: Locator;
  btnRemove!: (productName: string) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnCart = this.page.locator('(//div[@class="cart-icon"])[1]');
    this.btnRemove = (productName: string) => this.page.locator(`(//td/a[text()='${productName}']/../..//button[@title="Remove"])[1]`);
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
    /** MINI CART DRAWER **/
    this.miniCartDrawer = this.page.locator("//div[@data-position='right' and contains(@class,'mz-pure-drawer')][.//h5[contains(.,'Cart')]]");

    /** DROPDOWN CART **/
    this.btnViewCart = this.page.getByRole("link", { name: 'View Cart' });

    /** CHECKOUT LINK */
    this.lnkCheckout = this.page.getByRole('link', {
      name: 'Checkout',
      exact: true,
    });
  }

  /**
   * Returns the row locator for a specific product
   * @param productName
   * @returns Locator
   */
  rowProduct(productName: string): Locator {
    return this.page.locator(`(//td/a[text()='${productName}']/../..)[1]`);
  }

  /**
   * Returns the update button locator for a specific product
   * @param productName
   * @returns Locator
   */
  btnUpdate(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//button[@title="Update"]`,
    );
  }

  /**
   * Returns the quantity input locator for a specific product
   * @param productName
   * @returns Locator
   */
  inputQuantity(productName: string): Locator {
    return this.page.locator(
      `//td/a[text()='${productName}']/../..//input[starts-with(@name,'quantity')]`,
    );
  }

  /**
   * Returns the total cell locator for a specific product
   * @param productName
   * @returns Locator
   */
  cellTotal(productName: string): Locator {
    return this.page.locator(
      `(//td/a[text()='${productName}']/../..//td)[last()]`,
    );
  }
}
