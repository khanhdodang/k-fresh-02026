import { expect, Page } from '@playwright/test';
import { WAIT_SECONDS } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { ProductLocators } from '../locators/product-locators';
import { Product } from '../models/product';

/**
 * Defines available interaction types for products on the category page.
 */
export type ProductAction = 'Add to Cart' | 'Wishlist' | 'Compare' | 'Quick View';

export class ProductPage extends ProductLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Specifically handles adding a product to the comparison list.
   * @param productName - Name of the product to compare.
   */
  @step('Click Add to Compare Button')
  async clickAddToCompareButton(productName: string): Promise<void> {
    // Reuse the central action method for consistency
    await this.performActionOnProduct(productName, 'Compare');
  }

  /**
   * Main orchestrator to perform various actions on a product.
   * Handles scrolling, ID extraction, hovering, and dynamic button selection.
   * @param productName - Target product name.
   * @param action - Action type to execute.
   */
  @step('Perform action on product')
  async performActionOnProduct(productName: string, action: ProductAction): Promise<void> {
    // 1. Locate the product thumbnail and ensure it's in the viewport
    const targetProduct = this.productThumbnaiByName(productName);
    // 3. Hover over the thumbnail to reveal hidden action buttons

    // 4. Select the appropriate locator based on the requested action
    let actionBtn;
    switch (action) {
      case 'Add to Cart':
        actionBtn = this.btnAddCart(productName);
        break;
      case 'Wishlist':
        actionBtn = this.btnAddWishlist(productName);
        break;
      case 'Compare':
        actionBtn = this.productThumbnaiByName(productName).getByTitle('Compare this Product');
;
        break;
      case 'Quick View':
        actionBtn = this.btnQuickView(productName);
        break;
      default:
        throw new Error(`Unsupported action: "${action}"`);
    }
    console.log(actionBtn.toString());
    await targetProduct.hover();

    // 5. Wait for the button to be interactable and click it
    await actionBtn.waitFor({ 
        state: 'visible', 
        timeout: WAIT_SECONDS.ELEMENT_VISIBLE 
    });
    
    await actionBtn.hover(); // Ensure hover state is maintained before clicking
    await actionBtn.click({ force: true });

    // 6. Wait for background processes to settle (Network Idle)
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Scrapes all visible products on the page and converts them into Product objects.
   * Useful for dynamic data-driven testing.
   */
  @step('Get all products on the page')
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    
    // Ensure at least one product is loaded before scraping
    await this.productThumbnail.first().waitFor({ state: 'visible' });

    const count = await this.productName.count();

    for (let i = 0; i < count; i++) {
      // Use .nth(i) to target specific elements in the list
      const nameElement = this.productName.nth(i);
      const name = await nameElement.innerText();
      const priceText = await this.productPrice.nth(i).innerText();
      
      // Clean price string and convert to number (e.g., "$122.00" -> 122)
      const price = Number(priceText.replace(/[^0-9.-]+/g, ""));

      // Retrieve ID from the product link
      const href = await nameElement.getAttribute('href') || '';
      const idMatch = href.match(/product_id=(\d+)/);
      const id = idMatch ? Number(idMatch[1]) : 0;

      products.push({
        id: id,
        name: name.trim(),
        description: "", // Placeholder: Detailed info usually requires opening product page
        price: price,
        imageUrl: "",    // Placeholder: Can be implemented by selecting the img src
        brand: "",       // Placeholder
      });
    }
    return products;
  }

  @step('Click to navigate to compare page')
  async clickNavigateToComparePage(): Promise<void> {
    await this.btnNavigateToComparePage.waitFor({ state: 'visible' });
    await this.btnNavigateToComparePage.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Validates the success message displayed in the toast notification.
   * @param expectedMessage - The message expected to be in the toast.
   */
  @step('Verify Toast Message')
  async verifyProductInToast(expectedMessage: string): Promise<void> {
    
    // Wait for the toast to appear before assertion
    await this.commonPage.toastMessage.waitFor({ state: 'visible' });
    
    // Assert that the toast contains the expected success text
    await expect(this.commonPage.toastMessage).toContainText(expectedMessage);
  }
}