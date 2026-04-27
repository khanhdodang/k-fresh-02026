import { FrameLocator, Locator, Page } from '@playwright/test';
export class CommonLocators {
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.locatorInitialization();
    }

    setPage(page: Page): void {
        this.page = page;
        this.locatorInitialization();
    }

    getPage(): Page {
        return this.page;
    }

    //buttons
    btnSave!: Locator;
    btnCancel!: Locator;
    btnEdit!: Locator;
    btnDelete!: Locator;
    btnAddNew!: Locator;
    btnSubmit!: Locator;
    btnContinue!: Locator;
    btnConfirmDelete!: Locator;
    btnCancelDelete!: Locator;
    inputSearch!: Locator;
    ddlOption!: Locator;
    ddlOptionItem!: (option: string) => Locator;
    linkText!: (name: string) => Locator;

    Iframe1!: FrameLocator;
    Iframe2!: FrameLocator;
    Iframe3!: FrameLocator;
    Iframe4!: FrameLocator;

    iframe1 = 'iframe[name="RadWindow1"]';
    iframe2 = 'iframe[name="RadWindow2"]';
    iframe3 = 'iframe[name="RadWindow3"]';
    iframe4 = 'iframe[name="RadWindow4"]';

    shopByCategoryMenu!: Locator;

    //top category item
    itemTopCategory!: (itemName: string) => Locator;

    //toast
    toastMessage!: (productName: string) => Locator;
    // btnCloseToast!: Locator;
    btnCloseToast!: (name: string) => Locator;
    toastBody!: Locator;

    locatorInitialization(): void {
        this.btnSave = this.page.locator('button:has-text("Save")');
        this.btnCancel = this.page.locator('button:has-text("Cancel")');
        this.btnEdit = this.page.locator('button:has-text("Edit")');
        this.btnDelete = this.page.locator('button:has-text("Delete")');
        this.btnAddNew = this.page.locator('button:has-text("Add New")');
        this.btnSubmit = this.page.locator('//input[@type="submit"]');
        this.btnContinue = this.page.locator('//a[contains(@class, "btn") and contains(., "Continue")] | //input[@value="Continue"]');
        this.btnConfirmDelete = this.page.locator('button:has-text("Confirm Delete")');
        this.btnCancelDelete = this.page.locator('button:has-text("Cancel Delete")');
        this.inputSearch = this.page.locator('input[placeholder="Search"]');

        this.ddlOption = this.page.locator('ul[role="listbox"]');

        this.linkText = (name: string): Locator => {
            return this.page.locator(`xpath=//a[@id and text()="${name}"]`);
        };

        this.ddlOptionItem = (optionName: string): Locator => {
            return this.page.locator(`xpath=//ul/li[text()="${optionName}"]`);
        };

        this.btnCloseToast = (name: string): Locator => {
            // Sử dụng dấu backtick (phím cạnh số 1) để nội suy biến ${name}
            return this.page.locator(`//div[contains(@class,"toast")]//p//a[contains(text(),"${name}")]/ancestor::div//span[text()="×"]`);
        }
        this.inputSearch = this.page.locator('//input[@placeholder="Search"]');
        this.shopByCategoryMenu = this.page.locator('//a[text()=" Shop by Category"]');
        this.itemTopCategory = (itemName: string): Locator => {
            // Sửa dấu nháy đơn thành dấu backtick để nội suy biến itemName
            return this.page.locator(`//span[contains(text(),"${itemName}")]`);
        }
        this.toastMessage = (productName: string): Locator => {
            // 1. Dùng dấu backtick `
            // 2. Gọi đúng tên biến là ${productName}
            return this.page.locator(`//div[contains(@class,"toast")]//p//a[contains(text(),"${productName}")]`);
        }
        this.toastBody = this.page.locator('//div[@class="toast-body"]');
    }

    /**
     * Find Locator By Xpath
     * @param xpath
     * @returns
     */
    locatorByXpath(xpath: string): Locator {
        return this.page.locator(`xpath=${xpath}`);
    }

    /**
     * Find Locator By Id
     * @param id
     * @returns
     */
    locatorById(id: string): Locator {
        return this.page.locator(`xpath=//*[contains(@id,"${id}")]`);
    }

    /**
     * Find Locator By text
     * @param text
     * @returns
     */
    locatorByText(text: string): Locator {
        return this.page.locator(`xpath=//*[contains(text(),"${text}")]`);
    }

    /**
     * Identify iFrame
     * @param iframe
     * @returns
     */
    iframe(iframe: string): FrameLocator {
        return this.page.frameLocator(iframe);
    }

    /**
     * Find element by text
     * @param text
     * @param exact
     * @returns
     */
    text(text: string, exact: boolean = true): Locator {
        return this.page.getByText(text, { exact });
    }

    /**
     * Find element by text
     * @param text
     * @param exact
     * @returns
     */
    textIframe(iframe: string, text: string, exact: boolean = true): Locator {
        return this.page.frameLocator(iframe).getByText(text, { exact });
    }

    /**
     * Find element by text
     * @param locator
     * @param text
     * @param exact
     * @returns
     */
    locatorText(locator: Locator, text: string, exact: boolean = true): Locator {
        return locator.getByText(text, { exact });
    }

    /**
     * Find element by alt text
     * @param label
     * @param exact
     * @returns
     */
    altText(text: string, exact: boolean = true): Locator {
        return this.page.getByAltText(text, { exact });
    }

    /**
     * Find element by label
     * @param label
     * @param exact
     * @returns
     */
    label(label: string, exact: boolean = true): Locator {
        return this.page.getByLabel(label, { exact });
    }

    /**
     * Find element by title
     * @param title
     * @param exact
     * @returns
     */
    title(text: string, exact: boolean = true): Locator {
        return this.page.getByTitle(text, { exact });
    }

    /**
     * Find element by link name
     * @param name
     * @param exact
     * @returns
     */
    roleLinkName(name: string, exact: boolean = true): Locator {
        return this.page.getByRole('link', { name, exact });
    }

    /**
     * Find element by link name
     * @param iframe
     * @param name
     * @param exact
     * @returns
     */
    roleLinkNameIframe(iframe: string, name: string, exact: boolean = true): Locator {
        return this.page.frameLocator(iframe).getByRole('link', { name, exact });
    }

    /**
     * Find element by button name
     * @param name
     * @param exact
     * @returns
     */
    roleButtonName(name: string, exact: boolean = false): Locator {
        return this.page.getByRole('button', { name: name, exact: exact });
    }

    /**
     * Find element by textarea name
     * @param name
     * @returns
     */
    roleTextareaName(name: string): Locator {
        return this.page.locator(`textarea[name="${name}"]`);
    }

    /**
     * Find element by textarea name
     * @param name
     * @param exact
     * @returns
     */
    roleTextboxName(name: string, exact: boolean = true): Locator {
        return this.page.getByRole('textbox', { name, exact });
    }

    /**
     * Find element by option name
     * @param name
     * @param exact
     * @returns
     */
    roleOptionName(name: string, exact: boolean = true): Locator {
        return this.page.getByRole('option', { name, exact });
    }

    /**
     * Find element by radio name
     * @param name
     * @param exact
     * @returns
     */
    roleRadioName(name: string, exact: boolean = true): Locator {
        return this.page.getByRole('radio', { name, exact });
    }

    /**
     * Find element by tab name
     * @param tab
     * @param exact
     * @returns
     */
    roleTabName(tab: string, exact: boolean = true): Locator {
        return this.page.getByRole('tab', { name: tab, exact });
    }

    /**
     * Find element by button name
     * @param iframe
     * @param name
     * @param exact
     * @returns
     */
    roleButtonNameIframe(iframe: string, name: string, exact: boolean = true): Locator {
        return this.page.frameLocator(iframe).getByRole('button', { name, exact });
    }

    /**
     * Find element by locator
     * @param element
     * @returns
     */
    locatorIframe(iframe: string, element: string): Locator {
        return this.page.frameLocator(iframe).locator(element);
    }

    /**
     * Find element by label
     * @param iframe
     * @param label
     * @param exact
     * @returns
     */
    labelIframe(iframe: string, label: string, exact: boolean = true): Locator {
        return this.page.frameLocator(iframe).getByLabel(label, { exact });
    }

    /**
     * Find element by iframe in iframe
     * @param iframe1
     * @param iframe2
     * @param element
     * @returns
     */
    locatorIframeIframe(iframe1: string, iframe2: string, element: string): Locator {
        return this.page.frameLocator(iframe1).frameLocator(iframe2).locator(element);
    }
}
