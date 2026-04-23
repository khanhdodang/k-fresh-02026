import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class ProductLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  productThumbnail!: Locator;
  productThumbnaiByName!: (name: string) => Locator;
  productThumbnailTop!: (name: string) => Locator;
  imgProduct!: (productName: string) => Locator;
  iconCompare!: (productName: string) => Locator;
  productName!: Locator;
  productPrice!: Locator;


  //button
  btnCompare!: (productName: string) => Locator;
  btnCompareById!: (id: string) => Locator;
  btnAddWishlist!: (productName: string) => Locator;
  btnQuickView!: (productName: string) => Locator;
  btnAddCart!: (productName: string) => Locator;

  locatorInitialization(): void {
    super.locatorInitialization();
    this.productThumbnail = this.page.locator('//div[@class="product-thumb"]');
    this.productThumbnaiByName = (productName: string) => this.page.locator(`//h4/a[contains(text(),"${productName}")]/../../..`);
    this.productName = this.page.locator('//h4[@class="title"]');
    this.productPrice = this.page.locator('//div[@class="price"]');
    this.btnCompare = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[@title="Compare this Product"]`);
    this.btnAddWishlist = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-wishlist")]`);
    this.btnQuickView = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-quickview")]`);
    this.btnAddCart = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-cart")]`);
  }
}