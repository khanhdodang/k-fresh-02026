import { expect, Page } from '@playwright/test';
import { ProfileLocators } from '../locators/profile-locators';
import { CommonPage } from './common-page';
import { AddressData, UpdateProfileData, UserProfile } from '../models/user';
import { step } from '../utilities/logging';
import { Messages } from '../data/messages.data';

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

  async expectAddAddressSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(
      Messages.ADD_ADDRESS_SUCCESS_MESSAGE,
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

  async expectEditAccountValues(expectedData: UpdateProfileData): Promise<void> {
  const actualData = await this.getEditAccountValues();

  expect(actualData.firstName).toBe(expectedData.firstName);
  expect(actualData.lastName).toBe(expectedData.lastName);
  expect(actualData.telephone).toBe(expectedData.telephone);
  }

  async expectChangePasswordSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(
      Messages.CHANGE_PASSWORD_SUCCESS_MESSAGE,
    );
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
   * Note:
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
   * Selects country first, waits for region dropdown to reload, then selects region.
   */
  /**
 * Selects country first, waits for the expected region option, then selects region.
 */
async selectCountryAndRegion(country: string, region: string): Promise<void> {
  await expect(this.countryDropdown(country)).toBeAttached();
// Selecting country triggers region dropdown to reload, so we wait for the expected region option to be attached before selecting.
  await this.selectAddressCountry.selectOption({ label: country });
// Wait for the expected region option to be attached to ensure the dropdown is reloaded and ready for interaction.
  await this.selectAddressRegion.waitFor({ state: 'visible' });
// Wait for the expected region option to be attached to ensure the dropdown is reloaded and ready for interaction.
  await expect(this.regionDropdown(region)).toBeAttached();
// Now we can safely select the region.
  await this.selectAddressRegion.selectOption({ label: region });
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
   * Verifies an added address is listed in Address Book.
   */
  async expectAddressPresent(data: AddressData): Promise<void> {
    await expect(this.page.getByText(data.address1, { exact: false })).toBeVisible();
    await expect(this.page.getByText(data.city, { exact: false })).toBeVisible();
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
  async expectLogoutSuccessMessage(): Promise<void> {
    await expect(this.page.getByText(Messages.LOGOUT_CONFIRM_MESSAGE, { exact: false })).toBeVisible();
  }
}
