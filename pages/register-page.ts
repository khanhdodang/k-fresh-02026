import { expect, Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { RegisterLocators } from '../locators/register-locators';
import { UserProfile } from '../models/user';
import { Constants } from '../utilities/constants';

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
    await this.commonPage.goto(Constants.BASE_URL);
    const btnMyAccount = this.page.getByRole('button', { name: /My account/i }).first();
    await this.commonPage.hover(btnMyAccount);
    await this.commonPage.click(btnMyAccount);
    await this.commonPage.waitForMillis(Constants.TIMEOUTS.BUFFER_STEP_SECONDS * 1000);
    const btnRegister = this.page.getByRole('link', { name: 'Register' }).first();
    await this.commonPage.click(btnRegister);
    await expect(this.page).toHaveURL(/.*account\/register/, { timeout: Constants.TIMEOUTS.PAGE_EVENT_LOAD });
    await this.inputFirstName.fill(userProfile.firstName);
    await this.inputLastName.fill(userProfile.lastName);
    await this.inputEmail.fill(userProfile.email);
    await this.inputTelephone.fill(userProfile.phone);
    await this.inputPassword.fill(userProfile.password);
    await this.inputPasswordConfirm.fill(userProfile.password);
  }

  /**
   * Submits the registration form to create a new user account.
   */
  @step('Submit Registration Form')
  async submitRegistrationForm(): Promise<void> {
    await this.commonPage.click(this.btnContinue);
  }

  /**
   * Clicks the "Agree to Terms and Conditions" checkbox to accept the terms before registration.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.commonPage.click(this.chkPrivacyPolicy);
  }

  /** * Verifies that the user has been successfully registered
     * This method checks if the page URL contains the success message and clicks the continue link.
     */
  @step('Verify successful registration')
  async expectSuccessfulRegistration(): Promise<void> {
    await expect(this.page).toHaveURL(/.*account\/success/, { timeout: Constants.TIMEOUTS.PERFORM_LOADING * 1000 });
    await this.commonPage.click(this.btnSuccessContinue);
  }
}
