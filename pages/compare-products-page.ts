import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { CompareProductsLocators } from '../locators/compare-products-locators';
import { Product } from '../models/product';

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
  @step('Click Remove Product Button')
  async clickRemoveProductButton(productName: string): Promise<void> {
    
  }

   async getRemoveButtonCount(): Promise<number> { 
    return this.btnRemove.count(); 
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
   * Verifies that the specified products are successfully added and displayed in the comparison table.
   * @param productNames - A rest parameter containing an array of product names to verify.
   */
  @step('Verify Product Details in Compare Table')
  async verifyProductsDetails(...productNames: string[]): Promise<void> {
    // 1. Reuse the existing function to retrieve the entire list of product names on the UI.
    const actualProductNamesOnUI = await this.getProductNames();

    // 2. Loop through the list of expected product names and assert
    for (const expectedProductName of productNames) {
      // Use expect().toContain() of Playwright to check if an element is in the array
      expect(
        actualProductNamesOnUI, 
        `Expected product "${expectedProductName}" to be in the compare table`
      ).toContain(expectedProductName);
    }
  }
}

// /**
//    * Verifies that the specified products are successfully added and displayed in the comparison table.
//    * @param productNames - A rest parameter containing an array of product names to verify.
//    */
//   @step('Verify Product Details in Compare Table')
//   async verifyProductsDetails(...productNames: string[]): Promise<void> {
//     // 1. Wait for the compare table to be visible to ensure the page has loaded
//     // OpenCart comparison tables usually have the 'table-bordered' class
//     const compareTable = this.page.locator('//table[contains(@class, "table-bordered")]').first();
//     await compareTable.waitFor({ state: 'visible', timeout: 5000 });

//     // 2. Iterate through each product name passed to the function
//     for (const productName of productNames) {
//       // 3. Locate the product name inside the table. 
//       // Using getByRole('link') is highly reliable since product names on this page are clickable links.
//       const productElement = compareTable.getByRole('link', { name: productName, exact: false });

//       // 4. Assert that the product name is visible in the comparison list
//       // We use .first() just in case the name appears twice (e.g., in the image title and the text link)
//       await expect(productElement.first()).toBeVisible({ timeout: 5000 });
      
//       // Optional: Log success for debugging
//       console.log(`Verified product in compare table: ${productName}`);
//     }
//   }


