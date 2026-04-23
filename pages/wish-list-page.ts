import { expect, Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { WishListLocators } from '../locators/wish-list-locators';
import { Product } from '../models/product';

export class WishListPage extends WishListLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  @step('Remove Product from Wish List')
  async removeProductFromWishList(productName: string): Promise<void> {
    const row = this.getRowByProductName(productName);
    await row.locator(this.removeButton).click();
    await expect(this.successMessage).toBeVisible();
  }

  @step('Add Product to Cart from Wish List')
  async addProductToCartFromWishList(productName: string): Promise<void> {
    const row = this.getRowByProductName(productName);
    await row.locator(this.addButton).click();
    await expect(this.successMessage).toBeVisible();
  }

  @step('Get Wish List Products')
  async getWishListProducts(): Promise<Product[]> {
    const rows = this.page.locator('//table[contains(@class,"table")]//tbody//tr');
    const count = await rows.count();

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      // fix: td[2] không hợp lệ trong Playwright locator chain → dùng nth-child
      const name = await rows
        .nth(i)
        .locator('td:nth-child(2) a')
        .textContent();

      products.push({
        name: name?.trim() ?? '',
      } as Product);
    }

    return products;
  }

  @step('Go to Product Detail')
  async goToProductDetail(productName: string): Promise<void> {
    await this.getProductLink(productName).click();
  }
}