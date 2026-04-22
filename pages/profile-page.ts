import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { ProfileLocators } from '../locators/profile-locators';
import { UserProfile } from '../models/user';


export class ProfilePage extends ProfileLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
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

}
