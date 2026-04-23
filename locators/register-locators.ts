import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

/** RegisterLocators class extends CommonLocators and defines specific locators for the registration page of the e-commerce application.
 * @param page - The Playwright Page object used to interact with the web page.
 * This class includes locators for input fields such as first name, last name, email, telephone, password, confirm password, and the continue button.
 * It serves as a centralized location for managing all locators related to the registration page, allowing for easier maintenance and readability of the test code.
 */

export class RegisterLocators extends CommonLocators {
    inputFirstName!: Locator;
    inputLastName!: Locator;
    inputEmail!: Locator;
    inputTelephone!: Locator;
    inputPassword!: Locator;
    inputConfirmPassword!: Locator;
    inputPasswordConfirm!: Locator;
    radioNewsletterYes!: Locator;
    radioNewsletterNo!: Locator;
    chkPrivacyPolicy!: Locator;
    btnContinue!: Locator;
    btnSuccessContinue!: Locator;
    
    constructor(page: Page) {
        super(page);
        this.locatorInitialization();
    }

    locatorInitialization(): void {
        super.locatorInitialization();
        this.inputFirstName = this.page.locator('#input-firstname');
        this.inputLastName = this.page.locator('#input-lastname');
        this.inputEmail = this.page.locator('#input-email');
        this.inputTelephone = this.page.locator('#input-telephone');
        this.inputPassword = this.page.locator('#input-password');
        this.inputPasswordConfirm = this.page.locator('#input-confirm');
        this.radioNewsletterYes = this.page.locator(
            'input[name="newsletter"][value="1"]',
        );
        this.radioNewsletterNo = this.page.locator(
            'input[name="newsletter"][value="0"]',
        );
        this.chkPrivacyPolicy = this.page.locator('//label[@for="input-agree"]');
        this.btnContinue = this.page.locator('input[value="Continue"]');
        this.btnSuccessContinue = this.page.getByRole('link', { name: 'Continue' });
    }
}