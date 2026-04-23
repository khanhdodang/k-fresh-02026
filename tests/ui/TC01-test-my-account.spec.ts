import { test, expect } from '../pages/base-page';
import { Constants } from '../utilities/constants';

/**
 * TC001 - Verify My Account dashboard is displayed after successful login.
 */
test.describe('TC001 - My Account Dashboard', () => {
  test.beforeEach(async ({ commonPage, credentials }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await commonPage.login(credentials.email, credentials.password);
  });
//TC01 - Verify My Account dashboard is displayed after successful login.
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
//TC002 - Verify user can update account information successfully.

//TC003 - Verify user can change password successfully.
//TC004 - Verify user can add a new address successfully.
//TC005 - Verify user can logout successfully.