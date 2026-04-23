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


  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[1]');
    this.divSuccessAlert = this.page.getByRole('alert');
  }
}