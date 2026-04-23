import { expect, Page } from '@playwright/test';
import { CommonLocators } from '../locators/common-locators';
import {RegisterAccountPayload} from '../models/user';
/**
 * Common page actions shared by authentication/account tests.
 */
export class CommonPage extends CommonLocators {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens a specific URL.
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Logs in using provided account credentials.
   */
  async login(email: string, password: string): Promise<void> {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }

  /**
   * Registers a new account from register page.
   */
  async registerAccount(data: RegisterAccountPayload): Promise<void> {
    await this.registerFirstNameInput.fill(data.firstName);
    await this.registerLastNameInput.fill(data.lastName);
    await this.registerEmailInput.fill(data.email);
    await this.registerTelephoneInput.fill(data.telephone);
    await this.registerPasswordInput.fill(data.password);
    await this.registerConfirmPasswordInput.fill(data.password);
    await this.page.locator("label[for='input-agree']").click();
    await expect(this.registerPrivacyPolicyCheckbox).toBeChecked();
    await this.registerContinueButton.click();
  }

  /**
   * Verifies account dashboard is visible after successful login.
   */
  async expectMyAccountPage(): Promise<void> {
    await expect(this.accountHeading).toBeVisible();
    await expect(this.accountRightColumn).toBeVisible();
  }

  /**
   * Logs out from side menu on My Account screen.
   */
  async logoutFromSidebar(): Promise<void> {
    await this.logout.click();
  }
}
