import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';
import { DefaultAddressOption } from '../models/user';

/**
 * Locators for account/profile screens.
 */
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
  addressFirstNameInput!: Locator;
  addressLastNameInput!: Locator;
  addressCompanyInput!: Locator;
  addressLine1Input!: Locator;
  addressLine2Input!: Locator;
  addressCityInput!: Locator;
  addressPostcodeInput!: Locator;
  addressCountrySelect!: Locator;
  addressRegionSelect!: Locator;
  addAddressContinueButton!: Locator;
  btnNewAddress!: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }

  locatorInitialization(): void {
    super.locatorInitialization();
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
    this.addressFirstNameInput = this.page.locator("//input[@id='input-firstname']");
    this.addressLastNameInput = this.page.locator("//input[@id='input-lastname']");
    this.addressCompanyInput = this.page.locator("//input[@id='input-company']");
    this.addressLine1Input = this.page.locator("//input[@id='input-address-1']");
    this.addressLine2Input = this.page.locator("//input[@id='input-address-2']");
    this.addressCityInput = this.page.locator("//input[@id='input-city']");
    this.addressPostcodeInput = this.page.locator("//input[@id='input-postcode']");
    this.addressCountrySelect = this.page.locator("//select[@id='input-country']");
    this.addressRegionSelect = this.page.locator("//select[@id='input-zone']");
    this.addAddressContinueButton = this.page.locator("input[value='Continue']");
    this.btnNewAddress = this.page.locator("//a[contains(text(), 'New Address')]");
  }

  countryDropdown(countryName: string): Locator {
    return this.page.locator(`#input-country option:text-is("${countryName}")`);
  }

  regionDropdown(regionName: string): Locator {
    return this.page.locator(`#input-zone option:text-is("${regionName}")`);
  }

  /**
   * Returns dynamic locator for "Default Address" radio by yes/no.
   */
  getDefaultAddressRadio(value: DefaultAddressOption): Locator {
    const radioValue = value === 'yes' ? '1' : '0';
    return this.page.locator(`input[name='default'][value='${radioValue}']`);
  }
}
