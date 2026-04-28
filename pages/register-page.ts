import { expect, Locator, Page } from '@playwright/test';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { RegisterLocators } from '../locators/register-locators';
import { UserProfile } from '../models/user';
import { Assertions } from '../utilities/assertions';
import { Messages } from '../data/messages.data';

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
    await this.commonPage.fill(this.inputFirstName, userProfile.firstName);
    await this.commonPage.fill(this.inputLastName, userProfile.lastName);
    await this.commonPage.fill(this.inputEmail, userProfile.email);
    await this.commonPage.fill(this.inputTelephone, userProfile.telephone);
    if (userProfile.password) {
      await this.commonPage.fill(this.inputPassword, userProfile.password);
    }

    if (userProfile.confirmPassword) {
      await this.commonPage.fill(this.inputConfirmPassword, userProfile.confirmPassword);
    }
  }

  /**
   * Selects the "Yes" option for the newsletter.
   */
  @step('Select Newsletter Option - Yes')
  async selectNewsletter(): Promise<void> {
    await this.commonPage.click(this.radioNewsletterYes);
  }

  /**
   * Selects the "No" option for the newsletter.
   */
  @step('Select Newsletter Option - No')
  async unSelectNewsletter(): Promise<void> {
    await this.commonPage.click(this.radioNewsletterNo);
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
    await this.commonPage.isChecked(this.chkPrivacyPolicy);
  }

  /**
   * Gets the HTML5 validation message for a given input field.
   * @param locator The locator of the input field.
   * @returns The validation message string.
   */
  @step('Get Input Validation Message')
  async getInputValidationMessage(locator: Locator): Promise<string> {
    return await locator.evaluate(async (element): Promise<string> => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });
  }

  /**
   * Verifies that the registration success message is visible.
   */
  @step('Verify Success Message is Visible')
  async verifySuccessMessageIsVisible(): Promise<void> {
    await expect(this.lblSuccessMessage).toBeVisible();
  }

  /**
   * Gets the registration success message title text.
   * @returns The trimmed success message title.
   */
  @step('Get Success Message Title')
  async getSuccessMessageText(): Promise<string> {
    return await this.commonPage.textContent(this.lblSuccessMessage);
  }

  /**
   * Gets the registration success page content text.
   * @returns The trimmed success page content.
   */
  @step('Get Success Page Content')
  async getSuccessPageContentText(): Promise<string> {
    return await this.commonPage.textContent(this.lblSuccessPageContent);
  }

  /**
   * Verifies the error messages for all required fields when they are left empty.
   */
  @step('Verify Required Fields Error Messages')
  async verifyRequiredFieldsErrorMessages(): Promise<void> {
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorFirstName), Messages.REGISTER_ERROR_FIRSTNAME);
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorLastName), Messages.REGISTER_ERROR_LASTNAME);
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorEmail), Messages.REGISTER_ERROR_EMAIL);
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorTelephone), Messages.REGISTER_ERROR_TELEPHONE);
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorPassword), Messages.REGISTER_ERROR_PASSWORD);
    Assertions.assertEqual(await this.commonPage.textContent(this.lblErrorAgree), Messages.REGISTER_ERROR_PRIVACY_POLICY);
  }
}
