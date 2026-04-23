import { Locator, Page } from '@playwright/test';

/**
 * Shared locators used across login/account flows.
 */
export class CommonLocators {
  protected page: Page;
  inputEmail!: Locator;
  inputPassword!: Locator;
  btnLogin!: Locator;
  btnContinue!: Locator;
  alertSuccessUpdate!: Locator;
  accountHeading!: Locator;
  accountRightColumn!: Locator;
  editAccount!: Locator;
  updatePassword!: Locator;
  modifyAddress!: Locator;
  logout!: Locator;
  logoutHeading!: Locator;
  logoutMessage!: Locator;
  continueLogoutButton!: Locator;
  registerFirstNameInput!: Locator;
  registerLastNameInput!: Locator;
  registerEmailInput!: Locator;
  registerTelephoneInput!: Locator;
  registerPasswordInput!: Locator;
  registerConfirmPasswordInput!: Locator;
  registerPrivacyPolicyCheckbox!: Locator;
  registerContinueButton!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatorInitialization();
  }

  setPage(page: Page): void {
    this.page = page;
    this.locatorInitialization();
  }

  locatorInitialization(): void {
    this.inputEmail = this.page.locator("//input[@id='input-email']");
    this.inputPassword = this.page.locator("//input[@id='input-password']");
    this.btnLogin = this.page.locator("input[value='Login']");
    this.btnContinue = this.page.locator("//a[@class='btn btn-primary']");

    this.accountHeading = this.page.getByRole('heading', { name: 'My Account' });
    this.accountRightColumn = this.page.locator("//aside[@id='column-right']");
    this.editAccount = this.page.locator("//a[contains(text(), 'Edit your account')]").first();
    this.updatePassword = this.page.locator("//input[@class='btn btn-primary']");
    this.modifyAddress = this.page.locator("//a[contains(text(), 'Modify your address')]").first();
    this.logout = this.page.locator("//a[contains(text(), 'Logout')]").first();
    this.alertSuccessUpdate = this.page.locator("//div[contains(@class,'alert-success')]");

    this.logoutHeading = this.page.getByRole('heading', { name: 'Account Logout' });
    this.logoutMessage = this.page.locator('//div[@id="content"]').getByText('You have been logged off your account', {
      exact: false,
    });
    this.continueLogoutButton = this.page.locator("//a[contains(text(), 'Continue')]");

    this.registerFirstNameInput = this.page.locator("//input[@id='input-firstname']");
    this.registerLastNameInput = this.page.locator("//input[@id='input-lastname']");
    this.registerEmailInput = this.page.locator("//input[@id='input-email']");
    this.registerTelephoneInput = this.page.locator("//input[@id='input-telephone']");
    this.registerPasswordInput = this.page.locator("//input[@id='input-password']");
    this.registerConfirmPasswordInput = this.page.locator("//input[@id='input-confirm']");
    this.registerPrivacyPolicyCheckbox = this.page.locator("input[name='agree']");
    this.registerContinueButton = this.page.locator("input[value='Continue']");
  }
}
