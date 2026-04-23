import { Locator, Page } from "@playwright/test";
import { CommonLocators } from "./common-locators";

export class ProductLocators extends CommonLocators {
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  // Product detail locators
  lnkProduct!: Locator;
  btnSearch!: Locator;
  lblProductTitle!: Locator;
  lblProductPrice!: Locator;
  lblStockStatus!: Locator;
  imgMainProduct!: Locator;
  tabDescription!: Locator;
  tabSpecification!: Locator;
  divTabContent!: Locator;
  lnkBrand!: Locator;

  // Quantity selectors
  inputQuantity!: Locator;
  btnIncreaseQuantity!: Locator;
  btnDecreaseQuantity!: Locator;

  //Size chart selectors
  lnkSizeChart!: Locator;
  tblSizeChart!: Locator;
  btnSizeChartClose!: Locator;

  //pop-up selectors
  lnkPopup!: Locator;
  divPopupContent!: Locator;
  btnPopupClose!: Locator;

  //Compare selectors

  btnCompare!: Locator;
  boxCompareNotificationTop!: Locator;
  boxCompareNotificationContent!: Locator;
  btnCompareNotificationAction!: Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnSearch = this.page
      .locator('(//input[@placeholder="Search For Products"])')
      .first();
    this.lblProductTitle = this.page.locator("h1").first();
    this.lblProductPrice = this.page.locator('//h3[@data-update="price"]');
    this.lblStockStatus = this.page.locator(
      '//span[@class="badge badge-danger"]',
    );
    this.imgMainProduct = this.page
      .locator('//div[@class="image-thumb d-flex"]//a//img')
      .first();
    this.tabDescription = this.page
      .locator(
        '//a[contains(@class,"nav-link") and normalize-space()="Description"]',
      )
      .first();
    this.divTabContent = this.page
      .locator('//div[@class="description text-collapsed"]//p')
      .first();
    this.lnkBrand = this.page.locator('//li[.//span[text()="Brand:"]]//a');
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[2]');
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.btnDecreaseQuantity = this.page.locator(
      '(//button[@aria-label="Decrease quantity"])[2]',
    );

    // Size Chart locators with multiple strategies
    this.lnkSizeChart = this.page.locator("//a[@aria-label='Size chart']");
    this.tblSizeChart = this.page.locator(
      '//div[@class="modal fade show"]//table',
    );
    this.btnSizeChartClose = this.page.locator(
      '//div[@class="modal fade show"]//button[@aria-label="Close"]',
    );

    // Pop-up locators
    this.lnkPopup = this.page.locator("//a[@aria-label='Popup']");
    this.btnPopupClose = this.page.locator(
      '//div[@class="modal fade show"]//button[@aria-label="Close"]',
    );
    this.divPopupContent = this.page.locator(
      '//h4[contains(normalize-space(), "Popup content")]',
    );

    // Compare locators
    this.btnCompare = this.page.locator(
      '//button[contains(normalize-space(), "Compare this Product")]',
    );
    this.boxCompareNotificationTop = this.page.locator(
      "//div[@id='notification-box-top']",
    );
    this.boxCompareNotificationContent = this.page.locator(
      "//div[@id='notification-box-top']//div[contains(@class,'toast-body')]",
    );
    this.btnCompareNotificationAction = this.page.locator(
      "//div[@id='notification-box-top']//a[contains(.,'Product Compare')]",
    );
  }

  clickProductLink(productName: string) {
    this.lnkProduct = this.page.locator(`a:has-text("${productName}")`).first();
    return this.lnkProduct.click();
  }
}
