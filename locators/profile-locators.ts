import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';
import { DefaultAddressOption } from '../models/user';

export class ProfileLocators extends CommonLocators {
  inputFirstName!: Locator;
  inputLastName!: Locator;
  inputUpdateEmail!: Locator;
  inputTelephone!: Locator;
  btnUpdateAccount!: Locator;
  inputNewPassword!: Locator;
  inputNewPasswordConfirm!: Locator;
  btnChangePasswordContinue!: Locator;
  alertChangePasswordSuccess!: Locator;
  inputAddressFirstName!: Locator;
  inputAddressLastName!: Locator;
  inputAddressCompany!: Locator;
  inputAddressLine1!: Locator;
  inputAddressLine2!: Locator;
  inputAddressCity!: Locator;
  inputAddressPostcode!: Locator;
  selectAddressCountry!: Locator;
  selectAddressRegion!: Locator;
  btnAddAddressContinue!: Locator;
  btnNewAddress!: Locator;
// My account page locators
  accountHeading!: Locator;
  accountRightColumn!: Locator;
  btnEditAccount!: Locator;
  btnUpdatePassword!: Locator;
  btnModifyAddress!: Locator;
  btnLogout!: Locator;
  alertSuccessUpdate!: Locator;
  btnLogoutContinue!: Locator;
  btnContinue!: Locator;
  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  locatorInitialization(): void {
    super.locatorInitialization();
// My Account page locators
    this.accountHeading = this.page.getByRole('heading', { name: 'My Account' });
    this.accountRightColumn = this.page.locator("//aside[@id='column-right']");
    this.btnEditAccount = this.page.locator("//a[contains(text(), 'Edit your account')]");
    this.btnUpdatePassword = this.accountRightColumn.locator("a[href*='route=account/password']").first();
    this.btnModifyAddress = this.page.locator("//a[contains(text(), 'Modify your address')]");
    this.btnLogout = this.page.locator("//a[contains(text(), 'Logout')]");
    this.alertSuccessUpdate = this.page.locator("//div[contains(@class,'alert-success')]");
// Edit Account locators
    this.inputFirstName = this.page.locator("//input[@id='input-firstname']");
    this.inputLastName = this.page.locator("//input[@id='input-lastname']");
    this.inputUpdateEmail = this.page.locator("//input[@id='input-email']");
    this.inputTelephone = this.page.locator("//input[@id='input-telephone']");
    this.btnUpdateAccount = this.page.locator("//input[@class='btn btn-primary']");
// Change Password locators
    this.inputNewPassword = this.page.locator("//input[@id='input-password']");
    this.inputNewPasswordConfirm = this.page.locator("//input[@id='input-confirm']");
    this.btnChangePasswordContinue = this.page.locator("input[value='Continue']");
    this.alertChangePasswordSuccess = this.page.locator("//div[contains(@class,'alert-success')]");
// Address locators
    this.inputAddressFirstName = this.page.locator("//input[@id='input-firstname']");
    this.inputAddressLastName = this.page.locator("//input[@id='input-lastname']");
    this.inputAddressCompany = this.page.locator("//input[@id='input-company']");
    this.inputAddressLine1 = this.page.locator("//input[@id='input-address-1']");
    this.inputAddressLine2 = this.page.locator("//input[@id='input-address-2']");
    this.inputAddressCity = this.page.locator("//input[@id='input-city']");
    this.inputAddressPostcode = this.page.locator("//input[@id='input-postcode']");
    this.selectAddressCountry = this.page.locator("//select[@id='input-country']");
    this.selectAddressRegion = this.page.locator("//select[@id='input-zone']");
    this.btnAddAddressContinue = this.page.locator("input[value='Continue']");
    this.btnNewAddress = this.page.locator("//a[contains(text(), 'New Address')]");
// Logout locators
    this.btnLogoutContinue = this.page.locator("//a[contains(text(), 'Continue')]");
    this.btnContinue = this.page.locator("//a[contains(text(), 'Continue')]");
  }
// Dynamic locator for country dropdown option based on country name
  countryDropdown(countryName: string): Locator {
    return this.page.locator(`#input-country option:text-is("${countryName}")`);
  }
// Dynamic locator for region dropdown option based on region name
  regionDropdown(regionName: string): Locator {
    return this.page.locator(`#input-zone option:text-is("${regionName}")`);
  }

  /**
   * Returns dynamic locator for "Default Address" radio by yes/no.
   */
  getDefaultAddressRadio = (value: DefaultAddressOption): Locator => {
    return this.page.locator(`input[name="default"][value="${value === 'yes' ? '1' : '0'}"]`);
  }
}
