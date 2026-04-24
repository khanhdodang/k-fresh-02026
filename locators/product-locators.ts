import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class ProductLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  productThumbnail!: Locator;
  productThumb!: Locator;
  compareBtn!: Locator;
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
  btnNavigateToComparePage!: Locator;


  locatorInitialization(): void {
    super.locatorInitialization();
    this.productThumbnail = this.page.locator('//div[@class="product-thumb"]');
    this.productThumbnaiByName = (productName: string) => this.page.locator(`//h4/a[contains(text(),"${productName}")]/ancestor::div[contains(@class, "product-thumb")]`);
    // this.page.locator(`//h4/a[contains(text(),"${productName}")]/ancestor::div[contains(@class, "product-thumb")]
    this.productName = this.page.locator('//h4[@class="title"]');
    this.productPrice = this.page.locator('//div[@class="price"]');
    this.iconCompare = (productName: string) => this.productThumbnaiByName(productName).getByTitle('Compare this Product');
    this.compareBtn =   this.page.getByTitle('Compare this Product').first();

    this.btnAddWishlist = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-wishlist")]`);
    this.btnQuickView = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-quickview")]`);
    this.btnAddCart = (productName: string) => this.productThumbnaiByName(productName).locator(`//button[contains(@class,"btn-cart")]`);
    // this.btnNavigateToComparePage = this.page.getByRole('link', { name: /Product Compare/i });   
    this.btnNavigateToComparePage = this.page.locator('a.btn-secondary:has-text("Product Compare")');
         // this.btnNavigateToComparePage = this.page.locator('//a[contains(@href, "Compare")]');

  }
}