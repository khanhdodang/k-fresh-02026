import { test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
import { expect } from '@playwright/test';
import { Assertions } from '../../utilities/assertions';
import { Messages } from '../../data/messages.data';
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';
import { RegisterPage } from '../../pages/register-page';

let user: UserProfile;

test.describe('Register Tests', () => {



  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.REGISTER_URL);
    user = generateUserProfileData();
  });

  test("TC-001: Register with valid data - success", async ({ registerPage }) => {
    // Note: Since email must be unique, faker in register.data.ts helps
    // but if the test runs multiple times in the same session, we might need new data.
    await registerPage.fillRegistrationForm(user);
    await registerPage.selectNewsletter(false);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();

    await expect(registerPage.successMessage).toBeVisible();
    Assertions.assertEqual(
      (await registerPage.successMessage.textContent())?.trim(),
      Messages.REGISTER_SUCCESS_TITLE
    );
    Assertions.assertTextContains(
      (await registerPage.successPageContent.textContent())?.trim() ?? '',
      Messages.REGISTER_SUCCESS_FULL_MESSAGE
    );
  });

  test("TC-002: Register without filling any required fields", async ({ registerPage }) => {
    await registerPage.submitRegistrationForm();

    // Verify validation messages appear for all required fields
    Assertions.assertEqual((await registerPage.errorFirstName.textContent())?.trim(), Messages.REGISTER_ERROR_FIRSTNAME);
    Assertions.assertEqual((await registerPage.errorLastName.textContent())?.trim(), Messages.REGISTER_ERROR_LASTNAME);
    Assertions.assertEqual((await registerPage.errorEmail.textContent())?.trim(), Messages.REGISTER_ERROR_EMAIL);
    Assertions.assertEqual((await registerPage.errorTelephone.textContent())?.trim(), Messages.REGISTER_ERROR_TELEPHONE);
    Assertions.assertEqual((await registerPage.errorPassword.textContent())?.trim(), Messages.REGISTER_ERROR_PASSWORD);
    Assertions.assertEqual((await registerPage.errorAgree.textContent())?.trim(), Messages.REGISTER_ERROR_PRIVACY_POLICY);
  });

  test("TC-003: Register with invalid email format", async ({ registerPage, page }) => {
    const invalidUser = { ...user, email: "invalid-email-format" };
    await registerPage.fillRegistrationForm(invalidUser);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();

    // Verify registration did not succeed (still on register page or shows error)
    Assertions.assertEqual(page.url(), Constants.REGISTER_URL);
    const emailValue = await registerPage.inputEmail.inputValue();
    const validationMessage = await registerPage.inputEmail.evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });

    Assertions.assertEqual(validationMessage, `Please include an '@' in the email address. '${emailValue}' is missing an '@'.`);
  });

  test("TC-004: Register with password mismatch", async ({ registerPage }) => {
    await registerPage.fillRegistrationForm(user);
    await registerPage.inputConfirmPassword.fill("mismatchpassword123");
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();

    // Verify confirm password error message
    Assertions.assertEqual((await registerPage.errorConfirmPassword.textContent())?.trim(), Messages.REGISTER_ERROR_PASSWORD_CONFIRM);
  });

  test("TC-005: Register without agreeing to Privacy Policy", async ({ registerPage }) => {
    await registerPage.fillRegistrationForm(user);
    await registerPage.submitRegistrationForm();

    // Verify top alert message for privacy policy
    Assertions.assertEqual((await registerPage.errorAgree.textContent())?.trim(), Messages.REGISTER_ERROR_PRIVACY_POLICY);
  });

});
