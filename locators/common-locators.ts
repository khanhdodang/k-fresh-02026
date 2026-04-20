import { Locator, Page } from '@playwright/test';
export class CommonLocators {
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.locatorInitialization();
    }

    btnSave!: Locator;
    btnCancel!: Locator;
    btnEdit!: Locator;
    btnDelete!: Locator;
    btnAddNew!: Locator;
    btnSubmit!: Locator;
    btnConfirmDelete!: Locator;
    btnCancelDelete!: Locator;
    inputSearch!: Locator;

    locatorInitialization() {
        this.btnSave = this.page.locator('button:has-text("Save")');
        this.btnCancel = this.page.locator('button:has-text("Cancel")');
        this.btnEdit = this.page.locator('button:has-text("Edit")');
        this.btnDelete = this.page.locator('button:has-text("Delete")');
        this.btnAddNew = this.page.locator('button:has-text("Add New")');
        this.btnSubmit = this.page.locator('button[type="submit"]');
        this.btnConfirmDelete = this.page.locator('button:has-text("Confirm Delete")');
        this.btnCancelDelete = this.page.locator('button:has-text("Cancel Delete")');
        this.inputSearch = this.page.locator('input[placeholder="Search"]');
    }
}
