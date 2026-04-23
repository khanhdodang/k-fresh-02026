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
    btnContinueRegister!: Locator;

    constructor(page: Page) {
        super(page);
        this.locatorInitialization();
    }

    locatorInitialization() {
        super.locatorInitialization();
        this.inputFirstName = this.page.getByRole('textbox', { name: 'First Name*' });
        this.inputLastName = this.page.getByRole('textbox', { name: 'Last Name*' });
        this.inputEmail = this.page.getByRole('textbox', { name: 'E-Mail*' });
        this.inputTelephone = this.page.getByRole('textbox', { name: 'Telephone*' });
        this.inputPassword = this.page.getByRole('textbox', { name: 'Password*', exact: true });
        this.inputConfirmPassword = this.page.getByRole('textbox', { name: 'Password Confirm*' });
        this.btnContinueRegister = this.page.getByRole('button', { name: 'Continue' });
    }
}