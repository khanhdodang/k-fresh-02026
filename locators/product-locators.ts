import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class ProductLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  btnIncreaseQuantity!: Locator;
  inputQuantity!: Locator;
  divSuccessAlert!: Locator;
  searchInput!: Locator;
  firstProductImage!: Locator;
  btnBuyNow!: Locator;

  productThumbnail!: Locator;
  productThumb!: Locator;
  compareBtn!: Locator;
  productThumbnaiByName!: (name: string) => Locator;
  productThumbnailTop!: (name: string) => Locator;
  imgProduct!: (productName: string) => Locator;
  iconCompare!: (productName: string) => Locator;
  productName!: Locator;
  productPrice!: Locator;
  btnCompare!: (productName: string) => Locator;
  btnCompareById!: (id: string) => Locator;
  btnAddWishlist!: (productName: string) => Locator;
  btnQuickView!: (productName: string) => Locator;
  btnAddCart!: (productName: string) => Locator;
  btnNavigateToComparePage!: (productName: string) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.btnIncreaseQuantity = this.page.locator(
      '(//button[@aria-label="Increase quantity"])[2]',
    );
    this.inputQuantity = this.page.locator('(//input[@name="quantity"])[1]');
    this.divSuccessAlert = this.page.getByRole('alert');
    this.productThumbnail = this.page.locator('//div[@class="product-thumb"]');
    this.productThumbnaiByName = (productName: string) => this.page.locator(`//h4/a[contains(text(),"${productName}")]/ancestor::div[contains(@class, "product-thumb")]`);
    this.productName = this.page.locator('//h4[@class="title"]');
    this.productPrice = this.page.locator('//div[@class="price"]');
    this.iconCompare = (productName: string) => this.productThumbnaiByName(productName).getByTitle('Compare this Product');
    this.compareBtn = this.page.getByTitle('Compare this Product').first();
    this.btnAddWishlist = (productName: string) => this.productThumbnaiByName(productName).locator('//button[contains(@class,"btn-wishlist")]');
    this.btnQuickView = (productName: string) => this.productThumbnaiByName(productName).locator('//button[contains(@class,"btn-quickview")]');
    this.btnAddCart = (productName: string) => this.productThumbnaiByName(productName).locator('//button[contains(@class,"btn-cart")]');
    this.btnNavigateToComparePage = (productName: string): Locator => {
      return this.page.locator(`//div[contains(@class,"toast")]//p//a[contains(text(),"${productName}")]/ancestor::div[3]//a[contains(text(),"Product Compare")]`);
    }
  }
}
