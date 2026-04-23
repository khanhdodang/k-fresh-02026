import test, { expect, Page } from '@playwright/test';
import { Constants, WAIT_SECONDS } from '../utilities/constants';
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
     */
  /**
     * Clicks the "Add to Compare" button for the specified product using ID.
     * @param productName The name of the product for which to click the button.
     */
  @step('Click Add to Compare Button')
  async clickAddToCompareButton(productName: string): Promise<void> {
    // 1. Find the product thumbnail based on the product name
    const targetProduct = this.productThumbnaiByName(productName);

    // 2. Extract the product ID from the href of the product name link.
    const nameLink = targetProduct.locator('//h4//a');
    const href = await nameLink.getAttribute('href') || '';
    const idMatch = href.split(/product_id=(\d+)/);

    if (!idMatch) {
      throw new Error(`Cannot find ID for product: ${productName}`);
    }

    const productId = idMatch[1];

    // 3. Scroll đến product thumbnail và hover để hiển thị button
    await targetProduct.scrollIntoViewIfNeeded();
    await targetProduct.hover();

    // 4. Find the "Add to Compare" button using the product ID and click it
    const btnCompare = this.btnCompareById(productId);

    // Verify the button is visible before clicking
    await btnCompare.waitFor({
      state: 'visible',
      timeout: WAIT_SECONDS.ELEMENT_VISIBLE
    });
    await btnCompare.click();

    // 5. Wait for the toast message to appear and the system to finish processing
    await this.page.waitForLoadState('domcontentloaded');
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

  @step('Get all products on the page')
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    await this.productThumbnail.first().waitFor({ state: 'visible' });

    const count = await this.productName.count();

    for (let i = 0; i < count; i++) {
      const nameElement = this.productName.nth(i);
      const name = await nameElement.innerText();
      const priceText = await this.productPrice.nth(i).innerText();
      const price = Number(priceText.replace(/[^0-9.-]+/g, ""));

      const href = await nameElement.getAttribute('href') || '';
      const idMatch = href.match(/product_id=(\d+)/);
      const id = idMatch ? Number(idMatch[1]) : 0;

      products.push({
        id: id,
        name: name.trim(),
        description: "",
        price: price,
        imageUrl: "",
        brand: "",
      });
    }
    return products;
  }

  @step('Verify Toast Message After Adding To Compare')
  async verifyProductInToast(expectedName: string): Promise<void> {
    const expectedMessage = `Success: You have added ${expectedName} to your product comparison!`;
    await expect(this.commonPage.toastMessage).toBeVisible();
    await expect(this.commonPage.toastMessage).toContainText(expectedMessage);
  }
}

