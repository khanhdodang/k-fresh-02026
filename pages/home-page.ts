import { Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { HomeLocators } from '../locators/home-locators';

export class HomePage extends HomeLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  @step('Click Wishlist Icon')
  async clickWishListIcon(): Promise<void> {
    await this.wishListIcon.click();
  }

  /**
   * Hover vào product card thứ 2, click "Add to Wish List"
   * Trả về tên sản phẩm để dùng cho assertion ở các bước sau
   */
  @step("Add first product to Wishlist")
  async addFirstProductToWishlist(): Promise<void> {
    await this.productCards.first().hover();
    await this.getAddToWishlistButton(0).click();
  }
}
