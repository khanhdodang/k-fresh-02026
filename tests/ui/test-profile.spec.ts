import { expect } from '@playwright/test';
import { test } from '../../pages/base-page';
import {
  createAddressData,
  createRegisterData,
  createStrongPassword,
  createUpdateProfileData,
} from '../../data/user.helper';
import { Constants } from '../../utilities/constants';
import { user } from '../../data/login.data';
import type { UserProfile } from '../../models/user';

test.describe('TC001 - My Account Dashboard', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should show dashboard heading, shortcuts and right navigation', async ({
    page,
    profilePage,
  }) => {
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await expect(profilePage.accountHeading).toBeVisible();
    await profilePage.expectMainAccountShortcuts();
  });
});

test.describe('TC002 - Update Account Information', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should update first name, last name and telephone successfully', async ({
    page,
    profilePage,
  }) => {
    const updatedData = createUpdateProfileData();
    await profilePage.btnEditAccount.click();
    await profilePage.updateAccountInformation(updatedData);
    await profilePage.expectAccountUpdateSuccessMessage();
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await profilePage.btnEditAccount.click();
    await profilePage.getEditAccountValues();
    await profilePage.expectEditAccountValues(updatedData);
  });
});

test.describe('TC003 - Change Password', () => {
  test('should change password from My Account right after register', async ({
    page,
    registerPage,
    profilePage,
  }) => {
    const registerData = createRegisterData();
    const changedPassword = createStrongPassword();
    const userProfile: UserProfile = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      phone: registerData.telephone,
      password: registerData.password,
    };

    await page.goto(Constants.REGISTER_URL);
    await registerPage.fillRegistrationForm(userProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
    await expect(page).toHaveURL(/route=account\/success|route=account\/account/);

    if (page.url().includes('route=account/success')) {
      await page.getByRole('link', { name: 'Continue' }).first().click();
    }

    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await profilePage.openChangePasswordPage();
    await profilePage.changePassword(changedPassword);
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await profilePage.expectChangePasswordSuccessMessage();

  });
});

test.describe('TC004 - Add New Address', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should add a new address and show it in Address Book', async ({
    page,
    profilePage,
  }) => {
    const addressData = createAddressData();
    await profilePage.openAddAddressPage();
    await profilePage.addNewAddress(addressData);
    await expect(page).toHaveURL(Constants.ADDRESS_BOOK_URL);
    await profilePage.expectAddAddressSuccessMessage();
    await profilePage.expectAddressPresent(addressData);
  });
});

test.describe('TC005 - Logout', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should logout from My Account page and show confirmation', async ({
    page,
    profilePage,
  }) => {
    await expect(profilePage.accountHeading).toBeVisible();
    await profilePage.btnLogout.click();
    await expect(page).toHaveURL(Constants.LOGOUT_URL);
    await profilePage.expectLogoutSuccessMessage();
    await expect(profilePage.btnLogoutContinue).toBeVisible();
    await profilePage.btnLogoutContinue.click();
    await expect(page).toHaveURL(Constants.LOGOUT_REDIRECT_URL);
  });
});
