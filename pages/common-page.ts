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

  async closeToast(): Promise<void> {
    try {
      const btnCloseToast = this.btnCloseToast;
      if (await btnCloseToast.isVisible()) {
        await btnCloseToast.click();
        await this.waitForToastDisappear();
      }
    } catch {
        console.warn('Close button not found or toast already disappeared');
     }
  }
    async waitForToastDisappear(): Promise<void> {
    try {
      await this.toastBody.first().waitFor({ state: 'hidden', timeout: WAIT_SECONDS.TIMEOUT.TOAST });
    } catch {
        console.warn('Toast did not disappear within expected time');
     }
  }


    /**
     * Click on Locator
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
     * Input value into field
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

    @step('Wait for page load')
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState();
        await Utility.delay(3);
    }

    /**
     * Get Attribute Value
     */
    @step('Get Attribute Value')
    async getAttribute(locator: Locator, attribute: string = 'value'): Promise<string> {
        return await locator.first().getAttribute(attribute) ?? '';
    }

    /**
     * Go to the URL 
     * @param url 
     * @param isWait - Whether to wait for a few seconds after navigation (default: true)
     */
    @step('Go to the URL')
    async goto(url: string, isWait: boolean = true): Promise<void> {
        await test.step(`Maps to ${url}`, async () => {
            await this.page.goto(url);
            await this.page.waitForLoadState();
            if (isWait) {
                await Utility.delay(3);
            }
        });
    }

    @step('Reload Page')
    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
        await Utility.delay(1);
    }

    /**
     * Navigate to URL với Log
     */
    @step('Navigate to URL')
    async navigate(url: string, isWait: boolean = true): Promise<void> {
        Logger.log(`Maps to URL: ${url}`);
        await this.goto(url, isWait);
    }

    /**
     * Click Item from sidebar menu
     * @param itemName - Name of the item to click in the sidebar menu
     */
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

    @step('Get API Response')
    async getAPIResponse(
        url: string,
        method: string = 'GET',
        expectedStatus: number = 200,
        timeout: number = Constants.TIMEOUTS.DEFAULT
    ): Promise<{ response: Response; body: any } | null> {
        try {
            const response = await this.page.waitForResponse(
                res => res.url().includes(url) && res.request().method() === method && res.status() === expectedStatus,
                { timeout }
            );
            const body = await response.json();
            return { response, body };
        } catch {
            return null;
        }
    }

    
}