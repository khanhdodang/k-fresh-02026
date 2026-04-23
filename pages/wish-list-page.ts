import test, { expect, Page } from "@playwright/test";
import { Constants } from "../utilities/constants";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";
import { WishListLocators } from "../locators/wish-list-locators";
import { Product } from "../models/product";

export class WishListPage extends WishListLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Adds a product to the wish list by its name.
   * @param productName The name of the product to add to the wish list.
   */
  @step("Add Product to Wish List")
  async addProductToWishList(productName: string): Promise<void> {}

  /**
   * Removes a product from the wish list by its name.
   * @param productName The name of the product to remove from the wish list.
   */
  @step("Remove Product from Wish List")
  async removeProductFromWishList(productName: string): Promise<void> {}

  /**
   * Adds a product to the cart from the wish list by its name.
   * @param productName The name of the product to add to the cart from the wish list.
   */
  @step("Add Product to Cart from Wish List")
  async addProductToCartFromWishList(productName: string): Promise<void> {}

  /**
   *  Retrieves the list of products in the wish list.
   * @returns
   */
  @step("Get Wish List Products")
  async getWishListProducts(): Promise<Product[]> {
    return [];
  }
}
