import test, { Page } from '@playwright/test';
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


        /** Waits for a specified amount of time.
     * @param timeout The amount of time to wait in milliseconds.
     * This method uses Playwright's waitForTimeout to pause the execution for the specified duration, which can be useful for waiting for certain conditions or elements to be ready before proceeding with further actions.
     */
    async wait(timeout: number): Promise<void> {
        await test.step(`Wait for ${timeout} ms`, async () => {
            await this.page.waitForTimeout(timeout);
        });
    }
}