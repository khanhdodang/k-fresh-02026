import { expect, Page } from '@playwright/test';
import { ProfileLocators } from '../locators/profile-locators';
import { CommonPage } from './common-page';
import { AddressData, UpdateProfileData, UserProfile } from '../models/user';
import { step } from '../utilities/logging';
import { Messages } from '../data/messages.data';
import { Constants } from '../utilities/constants';

/**
 * Page object for user profile actions in My Account area.
 */
export class ProfilePage extends ProfileLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Verifies My Account page URL and heading.
   */
  async verifyMyAccountPage(): Promise<void> {
    await expect(this.page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await expect(this.accountHeading).toBeVisible();
  }

  /**
   * Updates the user's profile information with the provided data.
   */
  async updateProfileInformation(profileData: UserProfile): Promise<void> {
    await this.inputFirstName.fill(profileData.firstName);
    await this.inputLastName.fill(profileData.lastName);
    await this.inputUpdateEmail.fill(profileData.email);
    await this.inputTelephone.fill(profileData.phone);
    await this.btnUpdateAccount.click();
  }

  /**
   * Verifies that the user's profile information matches the expected data.
   */
  async verifyProfileInformation(expectedProfileData: UserProfile): Promise<void> {
    await expect(this.inputFirstName).toHaveValue(expectedProfileData.firstName);
    await expect(this.inputLastName).toHaveValue(expectedProfileData.lastName);
    await expect(this.inputUpdateEmail).toHaveValue(expectedProfileData.email);
    await expect(this.inputTelephone).toHaveValue(expectedProfileData.phone);
  }

  /**
   * Updates the user's configuration settings with the provided data.
   */
  @step('Update Configuration Settings')
  async updateConfigurationSettings(settingsData: unknown): Promise<void> {
    // TODO: Implement when configuration settings locators/data are ready.
  }

  /**
   * Opens Edit Account page.
   */
  async openEditAccountPage(): Promise<void> {
    await this.btnEditAccount.click();
  }

  /**
   * Updates first name, last name and telephone.
   */
  async updateAccountInformation(data: UpdateProfileData): Promise<void> {
    await this.inputFirstName.fill(data.firstName);
    await this.inputLastName.fill(data.lastName);
    await this.inputTelephone.fill(data.telephone);
    await this.btnUpdateAccount.click();
  }

  /**
   * Verifies account update success message.
   */
  async expectAccountUpdateSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(
      Messages.ACCOUNT_UPDATE_SUCCESS_MESSAGE,
    );
  }

  /**
   * Reads values from Edit Account form for data persistence validation.
   */
  async getEditAccountValues(): Promise<UpdateProfileData> {
    return {
      firstName: await this.inputFirstName.inputValue(),
      lastName: await this.inputLastName.inputValue(),
      telephone: await this.inputTelephone.inputValue(),
    };
  }

  /**
   * Verifies Edit Account form values against expected data.
   */
  async expectEditAccountValues(expectedData: UpdateProfileData): Promise<void> {
    const actualData = await this.getEditAccountValues();

    expect(actualData.firstName).toBe(expectedData.firstName);
    expect(actualData.lastName).toBe(expectedData.lastName);
    expect(actualData.telephone).toBe(expectedData.telephone);
  }

  /**
   * Opens Change Password page from side menu.
   */
  async openChangePasswordPage(): Promise<void> {
    await this.btnUpdatePassword.click();
  }

  /**
   * Changes account password.
   */
  async changePassword(newPassword: string): Promise<void> {
    await this.inputNewPassword.fill(newPassword);
    await this.inputNewPasswordConfirm.fill(newPassword);
    await this.btnChangePasswordContinue.click();
  }

  /**
   * Verifies change password success message.
   */
  async expectChangePasswordSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(
      Messages.CHANGE_PASSWORD_SUCCESS_MESSAGE,
    );
  }

  /**
   * Opens Address Book page and then Add Address form.
   */
  @step('Open Add Address form')
  async openAddAddressPage(): Promise<void> {
    await this.btnModifyAddress.click();
    await this.btnNewAddress.click();
  }

  /**
   * Adds a new address with provided data.
   *
   * Country and region are generated in user.helper.ts.
   * This page object only uses the provided data and does not generate random data.
   */
  @step('Add new address to Address Book')
  async addNewAddress(data: AddressData): Promise<void> {
    await this.inputAddressFirstName.fill(data.firstName);
    await this.inputAddressLastName.fill(data.lastName);
    await this.inputAddressCompany.fill(data.company);
    await this.inputAddressLine1.fill(data.address1);
    await this.inputAddressLine2.fill(data.address2);
    await this.inputAddressCity.fill(data.city);
    await this.inputAddressPostcode.fill(data.postcode);

    await this.selectCountryAndRegion(data.country, data.region);

    await this.getDefaultAddressRadio(data.defaultAddress).check();
    await this.btnAddAddressContinue.click();
  }

  /**
   * Selects country first, waits for the expected region option, then selects region.
   */
  async selectCountryAndRegion(country: string, region: string): Promise<void> {
    await expect(this.countryDropdown(country)).toBeAttached();

    await this.selectAddressCountry.selectOption({ label: country });
    await this.selectAddressRegion.waitFor({ state: 'visible' });

    await expect(this.regionDropdown(region)).toBeAttached();

    await this.selectAddressRegion.selectOption({ label: region });
  }

  /**
   * Verifies Address Book page URL.
   */
  async verifyAddressBookPage(): Promise<void> {
    await expect(this.page).toHaveURL(Constants.ADDRESS_BOOK_URL);
  }

  /**
   * Verifies user lands on account success or My Account right after registration.
   */
  async verifyRegistrationResultPage(): Promise<void> {
    await expect(this.page).toHaveURL(/route=account\/success|route=account\/account/);
  }

  /**
   * Clicks Continue when user is on account success page.
   */
  async continueFromRegistrationSuccessIfNeeded(): Promise<void> {
    if (this.page.url().includes('route=account/success')) {
      await this.btnContinue.first().click();
    }
  }

  /**
   * Verifies add address success message.
   */
  async expectAddAddressSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(
      Messages.ADD_ADDRESS_SUCCESS_MESSAGE,
    );
  }

  /**
   * Verifies an added address is listed in Address Book.
   */
  async expectAddressPresent(data: AddressData): Promise<void> {
    await expect(this.page.getByText(data.address1, { exact: false })).toBeVisible();
    await expect(this.page.getByText(data.city, { exact: false })).toBeVisible();
  }

  /**
   * Verifies account shortcuts and side links required by TC001.
   */
  async expectMainAccountShortcuts(): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: /Edit your account information/i }),
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', { name: /Change your password/i }),
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', {
        name: /Modify your address book entries/i,
      }),
    ).toBeVisible();

    await expect(this.accountRightColumn).toBeVisible();
  }

  /**
   * Verifies Edit Account form fields are visible.
   */
  async expectEditAccountUpdate(): Promise<void> {
    await expect(this.inputFirstName).toBeVisible();
    await expect(this.inputLastName).toBeVisible();
    await expect(this.inputTelephone).toBeVisible();
    await expect(this.inputUpdateEmail).toBeVisible();
  }

  /**
   * Clicks Logout from My Account page.
   */
  async logout(): Promise<void> {
    await this.btnLogout.click();
  }

  /**
   * Verifies Logout confirmation page URL and message.
   */
  async verifyLogoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(Constants.LOGOUT_URL);
    await this.expectLogoutSuccessMessage();
  }

  /**
   * Verifies logout success confirmation message.
   */
  async expectLogoutSuccessMessage(): Promise<void> {
    await expect(
      this.page.getByText(Messages.LOGOUT_CONFIRM_MESSAGE, { exact: false }),
    ).toBeVisible();
  }

  /**
   * Clicks Continue button after logout.
   */
  async continueAfterLogout(): Promise<void> {
    await expect(this.btnLogoutContinue).toBeVisible();
    await this.btnLogoutContinue.click();
  }

  /**
   * Verifies user is redirected after logout.
   */
  async verifyLogoutRedirectPage(): Promise<void> {
    await expect(this.page).toHaveURL(Constants.LOGOUT_REDIRECT_URL);
  }
}
