import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
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
   * @param userData An object containing user registration details.
   */
  @step('Fill Registration Form')
  async fillRegistrationForm(userData: UserProfile): Promise<void> {
      await this.commonPage.goto(Constants.ECOM_REGISTER_URL);
      
      await this.inputFirstName.fill(userData.firstName);
      await this.inputLastName.fill(userData.lastName);
      await this.inputEmail.fill(userData.email);
      await this.inputTelephone.fill(userData.phone); 
      await this.inputPassword.fill(userData.password);
      await this.inputConfirmPassword.fill(userData.password);
  }

  /**
   * Clicks the "Agree to Terms and Conditions" checkbox to accept the terms before registration.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
      await this.chkAgreeTerms.click({ force: true });
  }

  /**
   * Submits the registration form to create a new user account.
   */
  @step('Submit Registration Form')
  async submitRegistrationForm(): Promise<void> {
      await this.btnContinueRegister.click();
  }

  /** * Verifies that the user has been successfully registered
   * This method checks if the page URL contains the success message and clicks the continue link.
   */
  @step('Verify successful registration')
  async expectSuccessfulRegistration(): Promise<void> {
      await expect(this.page).toHaveURL(/.*account\/success/, { timeout: Constants.TIMEOUT_MEDIUM });
      await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}