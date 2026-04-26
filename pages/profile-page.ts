import { expect, Page } from '@playwright/test';
import { ProfileLocators } from '../locators/profile-locators';
import { CommonPage } from './common-page';
import { UpdateProfileData, AddressData, UserProfile } from '../models/user';
import { Constants } from '../utilities/constants';
import { step } from '../utilities/logging';

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
   * Opens Edit Account page from the right menu.
   */
  async openEditAccountPage(): Promise<void> {
    await this.editAccount.click();
  }

  /**
   *  Updates the user's profile information with the provided data.
   * @param profileData 
   */
  async updateProfileInformation(profileData: UserProfile): Promise<void> {
  }

  /**
   *  Verifies that the user's profile information matches the expected data.
   * @param expectedProfileData 
   */
  async verifyProfileInformation(expectedProfileData: UserProfile): Promise<void> {
  }

  /**
   *  Updates the user's configuration settings with the provided data.
   * @param settingsData 
   */
  @step('Update Configuration Settings')
  async updateConfiguationSettings(settingsData: any): Promise<void> {
  
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

  async expectAccountUpdateSuccessMessage(): Promise<void> {
    await expect(this.alertSuccessUpdate).toBeVisible();
    await expect(this.alertSuccessUpdate).toContainText(Constants.ACCOUNT_UPDATE_SUCCESS_MESSAGE);
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
   * Opens Change Password page from side menu.
   */
  async openChangePasswordPage(): Promise<void> {
    await this.updatePassword.click();
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
  async openAddAddressPage(): Promise<void> {
    await this.modifyAddress.click();
    await this.btnNewAddress.click();
  }

  /**
   * Adds a new address with provided data.
   */
  async addNewAddress(data: AddressData): Promise<void> {
    await this.addressFirstNameInput.fill(data.firstName);
    await this.addressLastNameInput.fill(data.lastName);
    await this.addressCompanyInput.fill(data.company);
    await this.addressLine1Input.fill(data.address1);
    await this.addressLine2Input.fill(data.address2);
    await this.addressCityInput.fill(data.city);
    await this.addressPostcodeInput.fill(data.postcode);
    await this.selectCountryAndRegion(data.country, data.region);
    await this.getDefaultAddressRadio(data.defaultAddress).check();
    await this.addAddressContinueButton.click();
  }

  /**
   * Selects country first, waits for region dropdown reload, then selects region.
   */
  async selectCountryAndRegion(country: string, region: string): Promise<void> {
    await this.addressCountrySelect.selectOption({ label: country });
    await this.addressRegionSelect.waitFor({ state: 'visible' });
    await this.page.waitForFunction(() => {
      const regionSelect = document.querySelector('#input-zone') as HTMLSelectElement | null;
      return Boolean(regionSelect && regionSelect.options.length > 1);
    });

    const selectedValues = await this.addressRegionSelect.selectOption({ label: region });
    expect(
      selectedValues.length,
      `Region "${region}" is not available for country "${country}"`,
    ).toBeGreaterThan(0);
  }

  /**
   * Verifies account shortcuts and side links required by TC01.
   */
  async expectMainAccountShortcuts(): Promise<void> {
    await expect(this.page.getByRole('link', { name: /Edit your account information/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Change your password/i })).toBeVisible();
    await expect(this.page.getByRole('link', { name: /Modify your address book entries/i })).toBeVisible();
    await expect(this.accountRightColumn).toBeVisible();
  }

  /**
   * Verifies an added address is listed in Address Book.
   */
  async expectAddressPresent(data: AddressData): Promise<void> {
    await expect(this.page.getByText(data.address1, { exact: false })).toBeVisible();
    await expect(this.page.getByText(data.city, { exact: false })).toBeVisible();
  }
/* Additional helper methods for assertions on profile pages can be added here, such as verifying updated account information, checking for success messages, etc. */
  async expectEditAccountUpdate(): Promise<void> {
    await expect(this.inputFirstName).toBeVisible();
    await expect(this.inputLastName).toBeVisible();
    await expect(this.inputTelephone).toBeVisible();
    await expect(this.inputUpdateEmail).toBeVisible();
  }
}
