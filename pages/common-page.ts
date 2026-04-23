import test, { expect, Page } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';
import { step } from '../utilities/logging';

export class CommonPage extends CommonLocators {
    
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigates to the specified URL.
     * @param url The URL to navigate to.
     */
    @step('Navigate to url')
    async goto(url: string): Promise<void> {
        await test.step(`Navigate to ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    @step('Click Item from sidebar menu')
    async clickSidebarItem(itemName: string): Promise<void> {
        await test.step(`Click sidebar item: ${itemName}`, async () => {
            await this.sidebarMenu.click();
            const itemLocator = this.locatorByText(itemName);
            await itemLocator.click();
        });
    }

    @step('Verify page loaded by checking title')
    async verifyPageLoaded(expectedTitle?: string): Promise<void> {
        await test.step('Verify page loaded by checking title', async () => {
            const title = await this.page.title();
            if (expectedTitle) {
                expect(title).toBe(expectedTitle);
            } else {
                expect(title).not.toBe('');
            }
        });
    }

    @step('Verify page has title')
    async verifyPageHasTitle(expectedTitle: string): Promise<void> {
        await test.step(`Verify page has title: ${expectedTitle}`, async () => {
            const title = await this.page.title();
            expect(title).toBe(expectedTitle);
        });
}
}
