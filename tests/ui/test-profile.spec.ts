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
    profilePage,
  }) => {
    await profilePage.verifyMyAccountPage();
    await profilePage.expectMainAccountShortcuts();
  });
});

test.describe('TC002 - Update Account Information', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should update first name, last name and telephone successfully', async ({
    profilePage,
  }) => {
    const updatedData = createUpdateProfileData();
    await profilePage.btnEditAccount.click();
    await profilePage.updateAccountInformation(updatedData);
    await profilePage.expectAccountUpdateSuccessMessage();
    await profilePage.verifyMyAccountPage();
    await profilePage.btnEditAccount.click();
    await profilePage.getEditAccountValues();
    await profilePage.expectEditAccountValues(updatedData);
  });
});

test.describe('TC003 - Change Password', () => {
  test('should change password from My Account right after register', async ({
    commonPage,
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

    await commonPage.goto(Constants.REGISTER_URL);
    await registerPage.fillRegistrationForm(userProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
    await profilePage.verifyRegistrationResultPage();
    await profilePage.continueFromRegistrationSuccessIfNeeded();

    await profilePage.verifyMyAccountPage();
    await profilePage.openChangePasswordPage();
    await profilePage.changePassword(changedPassword);
    await profilePage.verifyMyAccountPage();
    await profilePage.expectChangePasswordSuccessMessage();
  });
});

test.describe('TC004 - Add New Address', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user);
  });

  test('should add a new address and show it in Address Book', async ({
    profilePage,
  }) => {
    const addressData = createAddressData();
    await profilePage.openAddAddressPage();
    await profilePage.addNewAddress(addressData);
    await profilePage.verifyAddressBookPage();
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
    profilePage,
  }) => {
    await profilePage.verifyMyAccountPage();
    await profilePage.logout();
    await profilePage.verifyLogoutPage();
    await profilePage.continueAfterLogout();
    await profilePage.verifyLogoutRedirectPage();
  });
});
