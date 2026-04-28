import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class ProductLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorsInitialization();
  }
  btnAddToCart!: Locator;
  divSuccessAlert!: Locator;
  lnkViewCart!: Locator;
  btnIncreaseQuantity!: Locator;
  inputQuantity!: Locator;
  searchInput!: Locator;
  firstProductImage!: Locator;
  btnBuyNow!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[2]');
    this.divSuccessAlert = this.page.getByRole('alert');
    this.lnkViewCart = this.page
      .getByRole('link', { name: 'View Cart' })
      .first();
    this.btnAddToCart = this.page.getByRole('button', { name: 'Add to Cart', exact: true }).first();
    this.divSuccessAlert = this.page.getByRole('alert');
    this.lnkViewCart = this.page
      .getByRole('link', { name: 'View Cart' })
      .first();
    this.searchInput = this.page.locator('//input[@name="search"]');
    this.firstProductImage = this.page.locator('//div[contains(@class, "product-layout")]//img').first();
    this.btnBuyNow = this.page.locator('//button[text()="Buy Now"]');
  }
}
