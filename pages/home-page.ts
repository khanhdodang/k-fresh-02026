import { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { HomeLocators } from '../locators/home-locators';

export class HomePage extends HomeLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Navigates to the homepage URL defined in Constants.
   */
  async goto(): Promise<void> {
    await this.page.goto(Constants.BASE_URL);
  }

  /**
   * Selects a menu item from the main navigation.
   * @param menuName The name of the menu item to select.
   */
  @step('Select Menu')
  async selectMenu(menuName: string): Promise<void> {
    await this.commonPage.click(this.menuLink(menuName));
    await this.page.waitForLoadState('networkidle');
  }

  /**
     * Selects a product by its name from the homepage and navigates to the product detail page.
     * @param productName 
     */
  @step('Select product from homepage and open product detail page')
  async selectProduct(productName: string): Promise<void> {
    const product = this.productLink(productName);
    await expect(product).toBeVisible();
    await product.scrollIntoViewIfNeeded();
    await product.click({ force: true });
    await this.page.waitForURL(/route=product\/product|route=product%2Fproduct/);
  }

  @step('Hover over product and click Add to Cart')
  async hoverAndAddToCart(productName: string): Promise<void> {
    await this.commonPage.hover(this.productCard(productName));
    await this.commonPage.click(this.getAddToCartButton(productName));
    await this.commonPage.click(this.btnAddToCart);
  }

}
