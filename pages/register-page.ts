import { Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { RegisterLocators } from '../locators/register-locators';
import { UserProfile } from '../models/user';

export class RegisterPage extends RegisterLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Fills out the registration form with the provided user data.
   * @param userProfile An object containing user profile details.
   */
  @step('Fill Registration Form')
  async fillRegistrationForm(userProfile: UserProfile): Promise<void> {
    await this.inputFirstName.fill(userProfile.firstName);
    await this.inputLastName.fill(userProfile.lastName);
    await this.inputEmail.fill(userProfile.email);
    await this.inputTelephone.fill(userProfile.telephone);
    await this.inputPassword.fill(userProfile.password);
    await this.inputConfirmPassword.fill(userProfile.password);
  }

  /**
   * Selects newsletter option (Yes or No).
   * @param subscribe True for "Yes", false for "No".
   */
  @step("Select Newsletter Option")
  async selectNewsletter(subscribe: boolean): Promise<void> {
    if (subscribe) {
      await this.radioNewsletterYes.check();
    } else {
      await this.radioNewsletterNo.check();
    }
  }

  /**
   * Submits the registration form to create a new user account.
   */
  @step('Submit Registration Form')
  async submitRegistrationForm(): Promise<void> {
    await this.btnContinue.click();
  }

  /**
   * Clicks the "Agree to Terms and Conditions" checkbox to accept the terms before registration.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.chkPrivacyPolicy.check();
  }
}
