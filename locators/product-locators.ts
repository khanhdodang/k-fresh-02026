import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class ProductLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  btnIncreaseQuantity!: Locator;
  inputQuantity!: Locator;
  divSuccessAlert!: Locator;
  btnSearch!: Locator;
  searchInput!: Locator;
  firstProductImage!: Locator;
  btnBuyNow!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[1]');
    this.divSuccessAlert = this.page.getByRole('alert');
    this.btnSearch = this.page.locator('#search button').first();
    this.searchInput = this.page.locator('//input[@name="search"]');
    this.firstProductImage = this.page.locator('//div[contains(@class, "product-layout")]//img').first();
    this.btnBuyNow = this.page.locator('//button[text()="Buy Now"]');
  }
}
