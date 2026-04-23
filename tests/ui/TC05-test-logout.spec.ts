import { test, expect } from '../pages/base-page';
import { Constants } from '../utilities/constants';

/**
 * TC005 - Verify user can logout successfully.
 */
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
