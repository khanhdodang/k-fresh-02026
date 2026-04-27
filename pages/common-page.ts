import test, { expect, Locator, Page, type Response } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';
import { step } from '../utilities/logging';
import { Logger } from '../utilities/logger';
import { Constants, WAIT_SECONDS } from '../utilities/constants';
import { Utility } from '../utilities/utility';

export class CommonPage extends CommonLocators {

    constructor(page: Page) {
        super(page);
    }

async closeToast(name: string): Promise<void> {
    try {
        await this.btnCloseToast(name).click({ timeout: 3000 });
        await this.waitForToastDisappear();
    } catch {
        console.warn(`Toast "${name}" did not appear or close button is missing.`);
    }
}
    async waitForToastDisappear(): Promise<void> {
        try {
            await this.toastBody.first().waitFor({ state: 'hidden', timeout: WAIT_SECONDS.TIMEOUT.TOAST });
        } catch {
            console.warn('Toast did not disappear within expected time');
        }
    }

    async clickContinue(): Promise<void> {
    await this.btnContinue.click();
    await this.page.waitForLoadState('domcontentloaded');
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

    /**
     * Navigate to url
     * @param url
     */
    @step('Navigate to URL')
    async navigate(url: string, isWait: boolean = true): Promise<void> {
        Logger.log(`Navigate to URL: ${url}`);
        await this.goto(url, isWait);
    }

    /**
     * Scroll to Locator
     * @param locator
     */
    @step('Scroll to Locator')
    async scrollTo(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Check if Locator is Checked
     * @param locator
     * @returns
     */
    @step('Check if Locator is Checked')
    async isChecked(locator: Locator): Promise<boolean> {
        return await locator.isChecked();
    }

    /**
     * Select Option from Dropdown
     * @param locator
     * @param option
     */
    @step('Select Option from Dropdown')
    async selectOption(locator: Locator, option: string | string[]): Promise<void> {
        await expect(locator).toBeVisible();
        await locator.selectOption(option);
    }

    /**
     * Wait Until Element Contains Text
     * @param locator
     * @param text
     */
    @step('Wait Until Element Contains Text')
    async waitUntilContainsText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text, { timeout: Constants.TIMEOUTS.DEFAULT });
    }

    /**
     * Accept dialog popup
    */
    @step('Accept dialog popup')
    async dialogAccept(): Promise<void> {
        try {
            this.page.on('dialog', async dialog => await dialog.accept());
        } catch (ex: any) {
            Logger.log('dialogAccept', ex.message);
        }
    }

    /**
     * Verify dialog's message
     * @param message
     */
    @step('Verify message in a dialog')
    async dialogMessage(): Promise<string> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('No dialog appeared')), 5000); // 5s timeout

            this.page.once('dialog', async dialog => { // Use `once` to avoid multiple triggers
                clearTimeout(timeout); // Prevent timeout after dialog is received
                resolve(dialog.message());
            });
        });
    }

    /**
     * Reload page
     */
    @step('Reload Page')
    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
        await Utility.delay(1);
    }

    /**
     * Go Back Page
     */
    @step('Go Back Page')
    async goBackPage(): Promise<void> {
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
        await Utility.delay(1);
    }

    /**
     * Go Forward Page
     */
    @step('Go Forward Page')
    async goForwardPage(): Promise<void> {
        await this.page.goForward();
        await this.page.waitForLoadState('domcontentloaded');
        await Utility.delay(1);
    }

    /**
     * Press Keyboard
    * @param key eg: Enter, Shift+A
     */
    @step('Press Keyboard')
    async pressKeyboard(key: string = 'Enter'): Promise<void> {
        await this.page.keyboard.press(key);
    }

    /**
     * Type a text
    * @param text
     */
    @step('Type a text')
    async type(text: string, delay: number = 0): Promise<void> {
        await this.page.keyboard.type(text, { delay: delay });
    }

    /**
     * getAllTextContents: Returns an array of node.textContent values for all matching nodes.
     * @param locator
     * @returns
     */
    @step('Get All Text Contents')
    async getAllTextContents(locator: Locator): Promise<Array<string>> {
        return await locator.allTextContents();
    }

    /**
     * Get list values displaying in dropdown
     * @returns
     */
    @step('Get list dropdown values displaying in dropdown')
    async getAllOptionDropdown(): Promise<string[]> {
        await this.ddlOption.waitFor({ state: 'visible' });
        await Utility.delay(1);
        const vals: string[] = await this.getAllTextContents(this.ddlOption.locator('xpath=//li/div'));
        return vals;
    }

    /**
     * Select Option Dropdown
     * @param optionname
     * @param matching
     */
    @step('Select Option Dropdown')
    async selectOptionDropdown(optionname: string, matching: boolean = true): Promise<void> {
        await this.ddlOption.waitFor({ state: 'visible' });
        await Utility.delay(1);
        let xpath = `xpath=//li/div[text()="${optionname}"]`;
        if (matching === false)
            xpath = `xpath=//li/div[contains(text(),"${optionname}")]`;
        await this.click(this.ddlOption.locator(xpath));
    }

    /**
     * Select options by Index, start = 0
     * @param index default 0
     */
    @step('Select options by Index, start = 0')
    async selectOptionDropdownByIndex(index = 0): Promise<void> {
        await this.ddlOption.waitFor({ state: 'visible' });
        await Utility.delay(1);
        const eles = await this.ddlOption.all();
        await eles[index].scrollIntoViewIfNeeded();
        await this.click(eles[index]);
    }

    /**
     * Extract Protocol and Hostname
     * Then Navigate to subfix
     * @param path
     */
    @step('Navigate to URL')
    async openPage(path: string = ''): Promise<void> {
        const currentURL = this.page.url();
        const { protocol, hostname } = Utility.getDomainFromUrl(currentURL);

        await this.navigate(`${protocol}//${hostname}${path}`);
    }

    /**
     * Click to Hyperlink Text
     * @param text
     */
    @step('Click to Hyperlink Text')
    async clickToHyperlink(text: string): Promise<void> {
        await this.click(this.linkText(text));
    }

    /**
     * Get color of Locator
     * @param selector
     * @param styleValue
     * @param pseudoElement
     * @returns
     */
    @step('Get color of Locator')
    async getColor(selector: string, styleValue: string = 'background-color', pseudoElement: string = ''): Promise<string> {
        const params = {
            selector,
            styleValue,
            pseudoElement
        };

        const rgb = await this.page.evaluate(
            ({ selector, styleValue, pseudoElement }) => {
                const element: Element | null = document.querySelector(selector);
                if (!element) {
                    return ''; // or any default value like 'transparent'
                }

                let style: any;
                if (pseudoElement && pseudoElement !== '') {
                    style = window.getComputedStyle(element, pseudoElement);
                }
                else {
                    style = window.getComputedStyle(element);
                }
                return style.getPropertyValue(styleValue);
            }, params
        );

        return this.convertRgbToHex(rgb);
    }

    /**
     * Convert Rgb to Hex
     * @param color
     * @returns
     */
    @step('Convert Rgb to Hex')
    convertRgbToHex(color: string = ''): string {
        const [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [];
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    /**
     * Wait for a period of time (in seconds)
     * @param timeout
     */
    @step('Wait for a period of time')
    async waitFor(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout * 1000);
    }

    /**
     * Wait for a period of time in milliseconds.
     * Prefer this over getPage().waitForTimeout(ms) so all waits go through CommonPage.
     * @param ms
     */
    @step('Wait for milliseconds')
    async waitForMillis(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }

    /**
     * Scroll down the page until the locator becomes visible (e.g. for content below the fold).
     * @param locator - Element to scroll into view
     * @param options - maxScrolls (default 10), deltaY (default 300), delayMs (default 500)
     * @returns true if locator became visible, false if maxScrolls reached without visibility
     */
    @step('Scroll until locator visible')
    async scrollUntilVisible(
        locator: Locator,
        options: { maxScrolls?: number; deltaY?: number; delayMs?: number } = {}
    ): Promise<boolean> {
        const { maxScrolls = 10, deltaY = 300, delayMs = 500 } = options;
        for (let i = 0; i < maxScrolls; i++) {
            if (await locator.isVisible().catch(() => false)) return true;
            await this.page.mouse.wheel(0, deltaY);
            await this.page.waitForTimeout(delayMs);
        }
        return false;
    }

    /**
     * Confirm an Ant Design Popconfirm (delete-style) by clicking OK and wait for success message.
     * Waits for .ant-popover/.ant-popconfirm, clicks OK, then waits for success notification or fallback delay.
     * @param successText - Text or regex to wait for in success message (default: /delete.*success|Delete successfully!/i)
     * @param timeoutMs - Timeout for popup and success message (default 15000)
     */
    @step('Confirm Ant Design Popconfirm and wait for success')
    async confirmAntPopconfirmAndWaitForSuccess(
        successText: string | RegExp = /delete.*success|Delete successfully!/i,
        timeoutMs: number = 15000
    ): Promise<void> {
        const popconfirm = this.page.locator('.ant-popover, .ant-popconfirm').first();
        await expect(popconfirm).toBeVisible({ timeout: timeoutMs });

        const textPromise = this.page.getByText(successText).first()
            .waitFor({ state: 'visible', timeout: timeoutMs })
            .catch(() => null);

        const okBtn = this.page.locator('.ant-popover .ant-btn-primary, .ant-popconfirm .ant-btn-primary').first()
            .or(this.page.locator('.ant-popover').getByRole('button', { name: 'OK' }));
        await expect(okBtn).toBeVisible({ timeout: timeoutMs });
        await okBtn.click();

        const result = await textPromise;
        if (!result) {
            await this.waitForMillis(2000);
        }
    }

    /**
     * Confirm an Ant Design Confirm Modal (end-style) by clicking OK and wait for success message.
     * Waits for .ant-modal-confirm, clicks OK, then waits for success notification or fallback delay.
     * @param successText - Text or regex to wait for (default: /end.*success|End successfully!/i)
     * @param timeoutMs - Timeout for modal and success message (default 15000)
     */
    @step('Confirm Ant Design Modal and wait for success')
    async confirmAntModalAndWaitForSuccess(
        successText: string | RegExp = /end.*success|End successfully!/i,
        timeoutMs: number = 15000
    ): Promise<void> {
        const modal = this.page.locator('.ant-modal-confirm').first();
        await expect(modal).toBeVisible({ timeout: timeoutMs });

        const textPromise = this.page.getByText(successText).first()
            .waitFor({ state: 'visible', timeout: timeoutMs })
            .catch(() => null);

        const okBtn = modal.locator('.ant-btn-primary').first();
        await expect(okBtn).toBeVisible({ timeout: timeoutMs });
        await okBtn.click();

        const result = await textPromise;
        if (!result) {
            await this.waitForMillis(2000);
        }
    }

    /**
     * Confirm an Ant Design Popconfirm OR Confirm Modal by clicking OK (first visible) and wait for success.
     * Use when the UI may show either .ant-popover/.ant-popconfirm or .ant-modal-confirm.
     * @param successText - Text or regex to wait for (default: /end.*success|End successfully!/i)
     * @param timeoutMs - Timeout for popup and success message (default 15000)
     */
    @step('Confirm Ant Design Popup or Modal and wait for success')
    async confirmAntPopupOrModalAndWaitForSuccess(
        successText: string | RegExp = /end.*success|End successfully!/i,
        timeoutMs: number = 15000
    ): Promise<void> {
        const textPromise = this.page.getByText(successText).first()
            .waitFor({ state: 'visible', timeout: timeoutMs })
            .catch(() => null);

        const okBtn = this.page.locator('.ant-popover .ant-btn-primary, .ant-popconfirm .ant-btn-primary').first()
            .or(this.page.locator('.ant-modal-confirm .ant-btn-primary').first())
            .or(this.page.getByRole('button', { name: 'OK' }));

        await expect(okBtn).toBeVisible({ timeout: timeoutMs });
        await okBtn.click();

        const result = await textPromise;
        if (!result) {
            await this.waitForMillis(2000);
        }
    }

    /**
     * Get API Response
     * @param url - Substring matched against response URL
     * @param method - HTTP method (default GET)
     * @param expectedStatus
     * @param timeout - Timeout in milliseconds (default 60000)
     * @returns
     */
    @step('Wait for API Response')
    async getAPIResponse(
        url: string,
        method: string = 'GET',
        expectedStatus: number = 200,
        timeout: number = Constants.TIMEOUTS.DEFAULT
    ): Promise<{ response: Response; body: any } | null> {
        try {
            const response = await this.page.waitForResponse(
                res =>
                    res.url().includes(url) &&
                    res.request().method() === method &&
                    res.status() === expectedStatus,
                { timeout }
            );

            const body = await response.json();

            return { response, body };
        } catch {
            return null;
        }
    }

    @step('Verify page loaded by checking title')
    async verifyPageLoaded(expectedTitle?: string): Promise<void> {
        await test.step('Verify page loaded by checking title', async () => {
            const title = await this.page.title();
            console.log('Title:'+title)
            if (expectedTitle) {
                expect(title).toBe(expectedTitle);
            } else {
                expect(title).not.toBe('');
            }
        });
    }
}
