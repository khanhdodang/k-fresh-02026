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

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[1]');
    this.divSuccessAlert = this.page.getByRole('alert');
    this.lnkViewCart = this.page
      .getByRole('link', { name: 'View Cart' })
      .first();
    this.btnAddToCart = this.page.getByRole('button', { name: 'Add to Cart', exact: true }).first();
    this.divSuccessAlert = this.page.getByRole('alert');
    this.lnkViewCart = this.page
      .getByRole('link', { name: 'View Cart' })
      .first();
  }
}




