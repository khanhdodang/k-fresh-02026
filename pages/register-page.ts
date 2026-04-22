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
  }

  /**
   * Submits the registration form to create a new user account.
   */
  @step('Submit Registration Form')
  async submitRegistrationForm(): Promise<void> {
  }

  /**
   * Clicks the "Agree to Terms and Conditions" checkbox to accept the terms before registration.
   */
  @step('Click Agree to Terms Checkbox')
  async clickAgreeTermsCheckbox(): Promise<void> {
  }
}
