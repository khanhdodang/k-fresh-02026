import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';

export class HomeLocators extends CommonLocators {
    constructor(page: Page) {
        super(page);
        this.locatorsInitialization();
    }
    productLink!: (productName: string) => Locator;
    productCard!: (productName: string) => Locator;
    productName!: {
        productNameLink: (name: string) => string;
    };
    btnCategory!: Locator;
    menuLink!: (menuName: string) => Locator;
    btnAddToCart!: Locator;
    addToCart!: Locator;

    locatorsInitialization() {
        super.locatorInitialization();
        this.productLink = (productName: string) =>
            this.page.locator(`h4 a[href*="route=product/product"]`, {
                hasText: productName,
            }).first();

        this.productCard = (productName: string) =>
            this.page.locator(".product-thumb").filter({
                has: this.productLink(productName),
            }).first();

        this.productName = {
            productNameLink: (name: string) => `//a[contains(text(),"${name}")]`
        };

        /** Add to Cart button from product detail page */
        this.btnAddToCart = this.page.locator('button[title="Add to Cart"]');
        this.menuLink = (menuName: string) =>
            this.page.locator('nav').locator(`a:has-text("${menuName}")`);
    }

    getProductCard(productName: string): Locator {
        return this.page.locator('.product-thumb').filter({
            has: this.productLink(productName),
        }).first();
    }

    getAddToCartButton(productName: string): Locator {
        return this.getProductCard(productName)
            .locator('button[title="Add to Cart"]');
    }
}
