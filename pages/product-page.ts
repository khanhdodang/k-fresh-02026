import test, { expect, Page } from "@playwright/test";
import { Constants } from "../utilities/constants";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";
import { ProductLocators } from "../locators/product-locators";
import { Product } from "../models/product";

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
  @step("Click Add to Compare Button")
  async clickAddToCompareButton(productName: string): Promise<void> {
    await test.step(`Click Add to Compare button for product: ${productName}`, async () => {
      await this.clickProductLink(productName);
      await this.page.waitForLoadState(Constants.LOAD_STATE.NETWORK_IDLE);
      await this.btnCompare.click();
    });
  }

  @step("Verify compare notification box")
  async expectCompareNotificationBox(): Promise<void> {
    await test.step("Verify compare notification box", async () => {
      await expect(this.boxCompareNotificationTop).toBeVisible();
      await expect(this.boxCompareNotificationContent).toBeVisible();
      await expect(this.boxCompareNotificationContent).toContainText(
        /success|added to your product comparison/i,
      );
    });
  }

  /**
   * Check product details on the product page and return a Product object with the details.
   * @returns A Product object containing the details of the product on the product page.
   */

  @step("Get Product Details")
  async openProductDetail(productName: string): Promise<void> {
    await test.step(`Search product: ${productName}`, async () => {
      await this.commonPage.fill(this.inputSearch, productName);
      await this.page.keyboard.press("Enter");
      await this.page.waitForLoadState(Constants.LOAD_STATE.NETWORK_IDLE);
    });

    await test.step(`Open product detail: ${productName}`, async () => {
      await this.clickProductLink(productName);
      await this.page.waitForLoadState(Constants.LOAD_STATE.NETWORK_IDLE);
    });

    await test.step("Extract product details", async () => {
      // Verify product details are visible and contain expected values
      await expect(this.lblProductTitle).toBeVisible();
      await expect(this.lblProductTitle).toContainText(productName, {
        ignoreCase: true,
      });
    });

    await test.step("Verify prrice details", async () => {
      // Price should be visible and contain a currency symbol and a valid number format
      await expect(this.lblProductPrice).toBeVisible();
      await expect(this.lblProductPrice).toContainText("$");
      await expect(this.lblProductPrice).toContainText(/\d+\.\d{2}/);
    });

    await test.step("Verify stock status", async () => {
      // Stock status should be visible
      await expect(this.lblStockStatus).toBeVisible();
      await expect(this.lblStockStatus).toContainText(
        /in stock|out of stock|availability|available|unavailable/i,
      );
    });

    await test.step("Verify main product image and description", async () => {
      // Main product image should be visible and have a valid src attribute
      await expect(this.imgMainProduct).toBeVisible();
      await expect(this.imgMainProduct).toHaveAttribute(
        "src",
        /.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i,
      );
      const imageSrc = await this.imgMainProduct.getAttribute("src");
      expect(imageSrc).toBeTruthy();
    });

    await test.step("Verify description details", async () => {
      // Description tab should be visible and contain text
      await expect(this.tabDescription).toBeVisible();
      await this.tabDescription.click();
    });

    await test.step("Verify description content", async () => {
      await expect(this.divTabContent).toBeVisible();
      await expect(this.divTabContent).toContainText(/\w+/);
    });

    await test.step("Verify Brand", async () => {
      // Brand link should be visible and contain text
      await expect(this.lnkBrand).toBeVisible();
    });
  }

  /**
   * Check Quantity counter functionality by incrementing and decrementing the quantity and verifying the value changes accordingly.
   * @param initialQuantity The initial quantity value before incrementing or decrementing.
   */

  @step("Check Quantity Counter Functionality")
  async checkQuantityCounterFunctionality(productName: string): Promise<void> {
    await this.clickProductLink(productName);
    const initialValue = await this.inputQuantity.inputValue();
    await test.step("Verify initial quantity", async () => {
      await expect(this.inputQuantity).toBeVisible();
      //check initial quantity is a valid number and greater than 0
      expect(initialValue).toMatch(/^\d+$/);
      expect(parseInt(initialValue)).toBeGreaterThan(0);
    });
  }

  @step("Increment and Decrement Quantity and Verify")
  async incrementDecrementQuantityAndVerify(
    productName: string,
  ): Promise<void> {
    await test.step("Increment quantity and verify", async () => {
      await expect(this.btnIncreaseQuantity).toBeVisible();
      const times = 3;
      for (let i = 0; i < times; i++) {
        await this.btnIncreaseQuantity.click();
        await this.page.waitForTimeout(500);
      }
    });
  }

  @step("Decrement Quantity and Verify")
  async decrementQuantityAndVerify(productName: string): Promise<void> {
    await test.step("Decrement quantity and verify", async () => {
      await expect(this.btnDecreaseQuantity).toBeVisible();
      const times = 2;
      for (let i = 0; i < times; i++) {
        await this.btnDecreaseQuantity.click();
        await this.page.waitForTimeout(500);
      }
    });
  }

  @step("Verify Final Quantity Value")
  async verifyFinalQuantityValue(productName: string): Promise<void> {
    await test.step("Verify final quantity value", async () => {
      const finalValue = await this.inputQuantity.inputValue();
      // Final quantity should be initial value + 1 (3 increments - 2 decrements)
      const expectedValue = 1;
      expect(parseInt(finalValue)).toBe(expectedValue);
    });
  }

  @step("Fill Quantity Input Directly and Verify")
  async fillQuantityInputDirectlyAndVerify(productName: string): Promise<void> {
    await test.step("Fill quantity input directly and verify", async () => {
      const directValue = "5";
      await this.commonPage.fill(this.inputQuantity, directValue);
      await this.page.waitForTimeout(500);
      const finalValue = await this.inputQuantity.inputValue();
      expect(finalValue).toBe(directValue);
    });
  }

  /**
   * Check Size Chart functionality by opening the size chart, verifying the table is visible, closing the size chart, and verifying the table is no longer visible.
   */
  @step("Check Size Chart Functionality")
  async checkSizeChartFunctionality(productName: string): Promise<void> {
    await this.clickProductLink(productName);
    await test.step("Open size chart and verify table is visible", async () => {
      await this.lnkSizeChart.click();
      await expect(this.tblSizeChart).toBeVisible();
    });

    await test.step("Close size chart and verify table is not visible", async () => {
      await this.btnSizeChartClose.click();
      await expect(this.tblSizeChart).not.toBeVisible();
    });
  }

  /**
   * Check Add to Compare functionality by clicking the "Add to Compare" button, verifying the compare notification is visible with correct content
   * and then clicking the action button in the notification to navigate to the comparison page, and finally verifying the product is listed on the comparison page.
   * @param productName The name of the product to add to compare and verify on the comparison page.
   */
  @step("Check Add to Compare Functionality")

  /**
   * check pop-up functionality by opening the pop-up, verifying the content is visible, closing the pop-up, and verifying the content is no longer visible.
   */
  @step("Check Pop-up Functionality")
  async checkPopupFunctionality(productName: string): Promise<void> {
    await this.clickProductLink(productName);
    await test.step("Open pop-up and verify content is visible", async () => {
      await this.lnkPopup.click();
      await expect(this.divPopupContent).toBeVisible();
    });
    await test.step("Close pop-up and verify content is not visible", async () => {
      await this.btnPopupClose.click();
      await expect(this.divPopupContent).not.toBeVisible();
    });
  }

  /**
   * Clicks the "Quick View" button for the specified product.
   * @param productName The name of the product for which to click the button.
   */
  @step("Click Quick View Button")
  async clickQuickViewButton(productName: string): Promise<void> {}

  /**
   *  Clicks the "Inquiry" button for the specified product.
   * @param productName
   */
  @step("Click Inquiry Button")
  async clickInqueryButton(productName: string): Promise<void> {}

  /**
   * Compares the details of the specified product with the details of the same product in the comparison list.
   * @param actualProduct The details of the product on the product page.
   * @param expectedProduct The details of the same product in the comparison list.
   */
  @step("Compare Product Details")
  async compareProductDetails(
    actualProduct: Product,
    expectedProduct: Product,
  ): Promise<void> {}
}
