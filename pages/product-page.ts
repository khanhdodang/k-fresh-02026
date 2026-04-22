import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { ProductLocators } from '../locators/product-locators';
import { Product } from '../models/product';

export class ProductPage extends ProductLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the "Add to Compare" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step('Click Add to Compare Button')
  async clickAddToCompareButton(productName: string): Promise<void> {
  }

  /**
   * Clicks the "Quick View" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step('Click Quick View Button')
  async clickQuickViewButton(productName: string): Promise<void> {
  }

  /**
   *  Clicks the "Inquiry" button for the specified product.
   * @param productName 
   */
  @step('Click Inquiry Button')
  async clickInqueryButton(productName: string): Promise<void> {
  }

  /**
   * Compares the details of the specified product with the details of the same product in the comparison list.
   * @param actualProduct The details of the product on the product page.
   * @param expectedProduct The details of the same product in the comparison list.
   */
  @step('Compare Product Details')
  async compareProductDetails(actualProduct: Product, expectedProduct: Product): Promise<void> {
  }

}
