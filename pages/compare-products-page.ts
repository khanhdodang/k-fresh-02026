import { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CompareProductsLocators } from '../locators/compare-products-locators';
import { Product } from '../models/product';
import { ProductPage } from './product-page';

export class CompareProductsPage extends CompareProductsLocators {

  commonPage: CommonPage;
  productPage: ProductPage

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
    this.productPage = new ProductPage(page);
  }

  /**
   * Clicks the "Remove" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step('Click Remove Product Button')
  async clickRemoveProductButton(productName: string): Promise<void> {
    await this.btnRemove(productName).click();
  }
  
  async removeProductFromCompare(productId: string): Promise<void> {
    await this.clickRemoveProductButton(productId);
    // verify the product is removed from the compare table by checking the "Remove" button is no longer visible
    await expect(this.btnRemove(productId)).toBeHidden({ timeout: Constants.TIMEOUTS.DEFAULT});
  }

/**
 * Remove one or multiple products from the compare table
 * @param productIds List of product IDs to be removed
 */
@step('Remove products from compare table')
async removeProductsFromCompare(...products: Product[]): Promise<void> {
    for (const product of products) {
        // Click the remove button for the specific product ID
        await this.clickRemoveProductButton(product.id);
        
        // Verify the product is removed before moving to the next one
        // This ensures the table has updated and the DOM is stable
        await expect(this.btnRemove(product.id)).toBeHidden({ 
            timeout: Constants.TIMEOUTS.DEFAULT 
        });
    }
}

  /**
   * Clicks the "Add to Cart" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step('Click Add to Cart Button')
  async clickAddToCartButton(productName: string): Promise<void> {
  }

  /**
   * Clicks the "Continue" button to navigate back to the product listing page.
   */
  @step('Click Continue Button')
  async clickContinueButton(): Promise<void> {
    await this.btnContinue.click()
  }

  /**
   *  Retrieves the list of compared products.
   * @returns 
   */
  @step('Get Compared Products')
  async getComparedProducts(): Promise<Product[]> {
    return [];
  }

  /**
   *  Retrieves the names of all products in the comparison list.
   * @returns 
   */
  @step('Get Product Names')
  async getProductNames(): Promise<string[]> {
    return this.getRowValuesInternal('Product'); 
  }

    async getEmptyMessage(): Promise<string> { 
    return (await this.emptyMessage.textContent())?.trim() ?? ''; 
  }

    private async getRowValuesInternal(rowLabel: string): Promise<string[]> {
    await expect(this.table).toBeVisible();
    // Dùng this.table thay vì page.locator('table...')
    const targetRow = this.table.locator(`//tbody//tr[.//td[1][contains(text(), '${rowLabel}')]]`);

    const allTexts = await targetRow.locator('//td').allInnerTexts();
    return allTexts
      .map(text => text.trim())
      .filter(text => text !== rowLabel && text !== '');
  }

  async getPrices(): Promise<string[]> { return this.getRowValuesInternal('Price'); }
  async getBrands(): Promise<string[]> { return this.getRowValuesInternal('Brand'); }
  async getModels(): Promise<string[]> { return this.getRowValuesInternal('Model'); }
  async getAvailability(): Promise<string[]> { return this.getRowValuesInternal('Availability'); }
  async getRatings(): Promise<string[]> { return this.getRowValuesInternal('Rating'); }
  async getWeights(): Promise<string[]> { return this.getRowValuesInternal('Weight'); }
  async getDimensions(): Promise<string[]> { return this.getRowValuesInternal('Dimensions (L x W x H)'); }
  async getDescriptions(): Promise<string[]> { return this.getRowValuesInternal('Description'); }


  /**
   * HHelper function to verify the data of each row
   * @param dataPromise Promise returning an array of text values from the web
   * @param validationFn Function containing the expect conditions for each element
   */
  async verifyRow(dataPromise: Promise<string[]>, validationFn: (value: string) => void) {
    const data = await dataPromise;
    expect(data).toHaveLength(3);
    data.forEach(validationFn);
  }

  /**
   * Verify that the specified products are successfully added and displayed in the comparison table.
   * @param expectedProducts - An array of Product objects instead of a string.
   */
  @step('Verify Product Details in Compare Table')
  async verifyProductsDetails(...expectedProducts: Product[]): Promise<void> {
    // Get a list of existing product names on the UI.
    const actualProductNamesOnUI = await this.getProductNames();

    // Iterate through the list of expected Product objects.
    for (const product of expectedProducts) {
      expect(
        actualProductNamesOnUI, 
        `Expected product "${product.name}" to be in the compare table`
      ).toContain(product.name);
    }
  }

/**
 * 
 * @param expectedProducts : The product needs verification.
 */
@step('Verify navigation and products on Compare Page')
async verifyComparePageDisplaysCorrectProducts( ...expectedProducts: Product[]): Promise<void> {
    const targetName = expectedProducts[0].name;
    await this.productPage.clickNavigateToComparePage(targetName);
    await this.commonPage.verifyPageLoaded();
    await this.verifyProductsDetails(...expectedProducts);
}  

/**
 * Methods to check for duplicate products in the comparison table.
 */
  @step('Verify that there are no duplicate products in the comparison table.')
  async verifyNoDuplicateProducts(): Promise<void> {
    const productNames = await this.getProductNames();
    const uniqueProductNames = [...new Set(productNames)];
    expect(productNames).toEqual(uniqueProductNames);
  }

  /**
   * Verify that there are no products listed on the comparison page.
   * @param expectMessage: The message indicates the comparison table is empty.
   */
  @step('Verify that there are no products listed on the comparison page')
  async verifyNoProductOnComparionPage(expectMessage: string): Promise<void>{
    const emptyMsgFinal = await this.getEmptyMessage();
    expect(emptyMsgFinal).toContain(expectMessage);
    expect(this.table).toBeHidden()
  }
}
