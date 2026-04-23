import { test, expect } from '../pages/base-page';
import { createRegisterData, createStrongPassword } from '../data/user.helper';
import { Constants } from '../utilities/constants';

/**
 * TC003 - Verify user can change password successfully.
 * This case uses a newly registered dynamic account to avoid impacting shared accounts.
 */
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
