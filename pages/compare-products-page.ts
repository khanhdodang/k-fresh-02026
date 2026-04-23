import test, { expect, Page } from "@playwright/test";
import { Constants } from "../utilities/constants";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";
import { CompareProductsLocators } from "../locators/compare-products-locators";
import { Product } from "../models/product";

export class CompareProductsPage extends CompareProductsLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the "Remove" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step("Click Remove Product Button")
  async clickRemoveProductButton(productName: string): Promise<void> {}

  /**
   * Clicks the "Add to Cart" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step("Click Add to Cart Button")
  async clickAddToCartButton(productName: string): Promise<void> {}

  /**
   * Clicks the "Continue" button to navigate back to the product listing page.
   */
  @step("Click Continue Button")
  async clickContinueButton(): Promise<void> {}

  /**
   *  Retrieves the list of compared products.
   * @returns
   */
  @step("Get Compared Products")
  async getComparedProducts(): Promise<Product[]> {
    return [];
  }

  /**
   *  Retrieves the names of all products in the comparison list.
   * @returns
   */
  @step("Get Product Names")
  async getProductNames(): Promise<string[]> {
    return [];
  }
}
