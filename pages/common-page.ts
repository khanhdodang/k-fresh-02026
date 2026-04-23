import test, { Page } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';
import { step } from '../utilities/logging';
import { Logger } from '../utilities/logger';
import { Constants } from '../utilities/constants';
import { Utility } from '../utilities/utility';

export class CommonPage extends CommonLocators {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Click on Locator
     * @param locator
     */
    @step('Click on Locator')
    async click(locator: Locator, option?: object): Promise<void> {
        const target = locator.first();
        await expect(target).toBeVisible();
        await expect(target).toBeEnabled();
        if (await target.isEnabled()) {
            const att = await this.getAttribute(locator, 'disabled');
            if (att !== 'disabled') {
                await target.scrollIntoViewIfNeeded();
                try {
                    await target.click(option);
                } catch {
                    await target.click({ ...(option as Record<string, unknown>), force: true });
                }
                await this.page.waitForLoadState();
                await Utility.delay(1);
            }
        }
    }

    /**
     * Double Click on Locator
     * @param locator
     */
    @step('Double Click on Locator')
    async dblclick(locator: Locator, option?: object): Promise<void> {
        const target = locator.first();
        await expect(target).toBeVisible();
        await expect(target).toBeEnabled();
        if (await target.isEnabled()) {
            const att = await this.getAttribute(locator, 'disabled');
            if (att !== 'disabled') {
                await target.scrollIntoViewIfNeeded();
                try {
                    await target.dblclick(option);
                } catch {
                    await target.dblclick({ ...(option as Record<string, unknown>), force: true });
                }
                await this.page.waitForLoadState();
            }
        }
    }

    /**
     * Focuses the element, and then uses keyevents
     * @param locator
     * @param key
     */
    @step('Focuses the element, and then uses keyevents')
    async press(locator: Locator, key: string): Promise<void> {
        await locator.first().press(key);
        await this.page.waitForLoadState();
    }

    /**
     * Input value into field
     * @param locator
     * @param value
     * @param force
     */
    @step('Input value into field')
    async fill(locator: Locator, value: string, force: boolean = true, isClear?: boolean): Promise<void> {
        await expect(locator).toBeVisible();
        if (await locator.isEditable() && await locator.isEnabled()) {
            if (isClear) {
                await locator.clear();
                await locator.click();
            }
            await locator.fill(value, { force });
        }
    }

    /**
    * Input value into field
    * @param locator
    * @param value
    */
    @step('Input value into field')
    async pressSequentially(locator: Locator, value: string): Promise<void> {
        await expect(locator).toBeVisible();
        if (await locator.isEditable() && await locator.isEnabled()) {
            await locator.pressSequentially(value, { delay: 100 });
            await Utility.delay(2);
        }
    }

    /**
     * Clear Text Field
     * @param locator
     */
    @step('Clear Text Field')
    async clear(locator: Locator): Promise<void> {
        await locator.fill('');
    }

    /**
     * Hover over a Locator
     * @param locator
     */
    @step('Hover over a Locator')
    async hover(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
        await locator.hover();
        await Utility.delay(1);
    }

    /**
     * Check Locator is visible or not
     * @param locator
     * @returns
     */
    @step('Check Locator is visible or not')
    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    /**
     * Check Locator is enabled or not
     * @param locator
     * @returns
     */
    @step('Check Locator is enabled or not')
    async isEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    /**
     * Check Locator is editable or not
     * @param locator
     * @returns
     */
    @step('Check Locator is editable or not')
    async isEditable(locator: Locator): Promise<boolean> {
        return await locator.isEditable();
    }

    /**
     * Wait Locator with visible state
     * @param locator
     * @returns
     */
    @step('Wait Locator with visible state')
    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    /**
     * Wait Locator with attached state
     * @param locator
     * @returns
     */
    @step('Wait Locator with attached state')
    async waitForAttached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'attached' });
    }

    /**
     * Wait Locator with detached state
     * @param locator
     * @returns
     */
    @step('Wait Locator with detached state')
    async waitForDetached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'detached' });
    }

    /**
     * Wait Locator with hidden state
     * @param locator
     * @returns
     */
    @step('Wait Locator with hidden state')
    async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    /**
     * Wait Locator with disabled state
     * @param locator
     * @param [timeout=10000]
     */
    @step('Wait Locator with disabled state')
    async waitForDisabled(locator: Locator, timeout: number = 10000): Promise<void> {
        await expect(locator).toBeDisabled({ timeout });
    }
    /**
     * Wait for page load
     */
    @step('Wait for page load')
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState();
        await Utility.delay(3);
    }

    /**
     * Scroll an element into view
     * @param locator
     */
    @step('Scroll an element into view')
    async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Get the count of elements matching the locator
     * @param locator
     * @returns
     */
    @step('Get the count of elements matching the locator')
    async count(locator: Locator): Promise<number> {
        return await locator.count();
    }

    /**
     * Get Text of Locator, if errors, return ''
     * @param locator
     * @param trim - Whether to trim whitespace (default: true)
     * @returns
     */
    @step('Get Text of Locator')
    async textContent(locator: Locator, trim: boolean = true): Promise<string> {
        const content = await locator.first().textContent() ?? '';
        return trim ? content.trim() : content;
    }

    /**
     * Get Inner Text of Locator, if errors, return ''
     * @param locator
     * @returns
     */
    @step('Get Inner Text of Locator')
    async innerText(locator: Locator): Promise<string> {
        return (await locator.first().innerText())?.trim() ?? '';
    }

    /**
     * Check Locator attribute
     * @param locator
     * @param attribute Default: value
     * @returns
     */
    @step('Get Attribute Value')
    async getAttribute(locator: Locator, attribute: string = 'value'): Promise<string> {
        return await locator.first().getAttribute(attribute) ?? '';
    }

    /**
     * Wait for an element to disappear
     * @param locator
     */
    @step('Wait for an element to disappear')
    async waitForElementToDisappear(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'hidden' });
    }

    /**
     * Expect Locator to be hidden
     * @param locator
     */
    @step('Expect Locator to be hidden')
    async toBeHidden(locator: Locator): Promise<void> {
        await expect.soft(locator).toBeHidden();
    }

    // New Functions
    /**
     * Upload a file to a file input field
     * @param locator
     * @param filePath
     */
    @step('Upload a file to a file input field')
    async uploadFile(locator: Locator, filePath: string): Promise<void> {
        await expect(locator).toBeVisible();
        await locator.setInputFiles(filePath);
    }

    /**
     * Check if an element has an attribute
     * @param locator
     * @param attribute
     * @returns
     */
    @step('Check if an element has an attribute')
    async isAttributeExist(locator: Locator, attribute: string): Promise<boolean> {
        const isHasAttribute = await locator.getAttribute(attribute);
        return isHasAttribute !== null;
    }

    /**
     * Validate Option
     * @param conditionMethods
     * @param option
     */
    @step('Validate Options')
    validateOption(conditionMethods: { [key: string]: string }, option: string): void {
        // Validate the option
        if (!Object.hasOwn(conditionMethods, option)) {
            throw new Error(`Invalid option: "${option}". No corresponding method found.`);
        }
    }

    /**
     * Fill Date
     * @param locator
     * @param date mm/dd/yyyy
     * @param page
     */
    @step('Fill data into field')
    async fillDate(locator: Locator, date: string = '01/01/2024'): Promise<void> {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEnabled();
        await locator.click({ position: { x: 10, y: 5 }, force: true });
        await locator.fill('', { force: true });

        const macOS = process.platform === 'darwin';
        if (macOS) {
            // on macOS
            await this.page.keyboard.press('Meta+A');
        } else {
            // on Windows and Linux
            await this.page.keyboard.press('Control+A');
        }

        await this.page.keyboard.press('Delete');
        await Utility.delay(1);
        await this.page.keyboard.type(date, { delay: 100 });
    }

    /**
     * Close Browser
     */
    async closeBrowser(): Promise<void> {
        await this.page.close();
    }

    /**
     * Go to the URL
     * @param url
     */
    @step('Go to the URL')
    async goto(url: string, isWait: boolean = true): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState();
        if (isWait) {
            await Utility.delay(3);
        }
    }

    /**
     * Reload page
     */
    @step('Reload page')
    async reload(): Promise<void> {
        await this.page.reload();
        await this.page.waitForLoadState();
        await Utility.delay(3);
    }
}