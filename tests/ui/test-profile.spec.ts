import { test, expect } from '../../pages/base-page';
import {
  createAddressData,
  createRegisterData,
  createStrongPassword,
  createUpdateProfileData,
} from '../../data/user.helper';
import { Constants } from '../../utilities/constants';

test.describe('TC001 - My Account Dashboard', () => {
  test.beforeEach(async ({ commonPage, credentials }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await commonPage.login(credentials.email, credentials.password);
  });

  test('should show dashboard heading, shortcuts and right navigation', async ({
    page,
    commonPage,
    profilesPage,
  }) => {
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await commonPage.expectMyAccountPage();
    await profilesPage.expectMainAccountShortcuts();
  });
});

test.describe('TC002 - Update Account Information', () => {
  test.beforeEach(async ({ commonPage, credentials }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await commonPage.login(credentials.email, credentials.password);
  });

  test('should update first name, last name and telephone successfully', async ({
    page,
    profilesPage,
  }) => {
    const updatedData = createUpdateProfileData();
    await profilesPage.openEditAccountPage();
    await profilesPage.updateAccountInformation(updatedData);
    await profilesPage.expectAccountUpdateSuccessMessage();
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await profilesPage.openEditAccountPage();
    const actualData = await profilesPage.getEditAccountValues();
    expect(actualData.firstName).toBe(updatedData.firstName);
    expect(actualData.lastName).toBe(updatedData.lastName);
    expect(actualData.telephone).toBe(updatedData.telephone);
  });
});

test.describe('TC003 - Change Password', () => {
  test('should change password from My Account right after register', async ({
    page,
    commonPage,
    profilesPage,
  }) => {
    const registerData = createRegisterData();
    const changedPassword = createStrongPassword();

    await commonPage.goto(Constants.REGISTER_URL);
    await commonPage.registerAccount(registerData);
    await expect(page).toHaveURL(/route=account\/success|route=account\/account/);
    if (page.url().includes('route=account/success')) {
      await commonPage.btnContinue.click();
    }
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await profilesPage.openChangePasswordPage();
    await profilesPage.changePassword(changedPassword);
    await expect(page).toHaveURL(Constants.MY_ACCOUNT_URL);
    await expect(commonPage.alertSuccessUpdate).toContainText(Constants.CHANGE_PASSWORD_SUCCESS_MESSAGE);
  });
});

test.describe('TC004 - Add New Address', () => {
  test.beforeEach(async ({ commonPage, credentials }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await commonPage.login(credentials.email, credentials.password);
  });

  test('should add a new address and show it in Address Book', async ({
    page,
    profilesPage,
    commonPage,
  }) => {
    const addressData = createAddressData();
    await profilesPage.openAddAddressPage();
    await profilesPage.addNewAddress(addressData);
    await expect(page).toHaveURL(Constants.ADDRESS_BOOK_URL);
    await expect(commonPage.alertSuccessUpdate).toContainText(Constants.ADD_ADDRESS_SUCCESS_MESSAGE);
    await profilesPage.expectAddressPresent(addressData);
  });
});

test.describe('TC005 - Logout', () => {
  test.beforeEach(async ({ commonPage, credentials }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await commonPage.login(credentials.email, credentials.password);
  });

  test('should logout from My Account page and show confirmation', async ({
    page,
    commonPage,
  }) => {
    await commonPage.expectMyAccountPage();
    await commonPage.logoutFromSidebar();
    await expect(page).toHaveURL(Constants.LOGOUT_URL);
    await expect(commonPage.logoutHeading).toBeVisible();
    await expect(commonPage.logoutMessage).toContainText(Constants.LOGOUT_CONFIRM_MESSAGE);
    await expect(commonPage.continueLogoutButton).toBeVisible();
    await commonPage.continueLogoutButton.click();
    await expect(page).toHaveURL(Constants.LOGOUT_REDIRECT_URL);
  });
});
