import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";
import { RegisterLocators } from "../locators/register-locators";
import { UserProfile } from "../models/user";

export class RegisterPage extends RegisterLocators {
  common: CommonPage;

  constructor(page: Page) {
    super(page);
    this.common = new CommonPage(page);
  }

  /**
   * Fills out the registration form with the provided user data.
   * @param userProfile An object containing user profile details.
   */
  @step("Fill Registration Form")
  async fillRegistrationForm(userProfile: UserProfile): Promise<void> {
    await this.common.fill(this.inputFirstName, userProfile.firstName);
    await this.common.fill(this.inputLastName, userProfile.lastName);
    await this.common.fill(this.inputEmail, userProfile.email);
    await this.common.fill(this.inputTelephone, userProfile.telephone);
    await this.common.fill(this.inputPassword, userProfile.password);
    await this.common.fill(
      this.inputConfirmPassword,
      userProfile.confirmPassword || userProfile.password,
    );
  }

  /**
   * Selects newsletter option (Yes or No).
   * @param subscribe True for "Yes", false for "No".
   */
  @step("Select Newsletter Option")
  async selectNewsletter(subscribe: boolean = true): Promise<void> {
    if (subscribe) {
      await this.common.click(this.radioNewsletterYes);
    } else {
      await this.common.click(this.radioNewsletterNo);
    }
  }

  /**
   * Submits the registration form to create a new user account.
   */
  @step("Submit Registration Form")
  async submitRegistrationForm(): Promise<void> {
    await this.common.click(this.btnContinue);
  }

  /**
   * Clicks the "Agree to Terms and Conditions" checkbox to accept the terms before registration.
   */
  @step("Click Agree to Terms Checkbox")
  async clickAgreeTermsCheckbox(): Promise<void> {
    await this.common.isChecked(this.chkPrivacyPolicy);
  }

  /**
   * Gets the HTML5 validation message for a given input field.
   * @param locator The locator of the input field.
   * @returns The validation message string.
   */
  @step("Get Input Validation Message")
  async getInputValidationMessage(locator: Locator): Promise<string> {
    return await locator.evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });
  }
}
