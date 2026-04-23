import { test, expect } from '../pages/base-page';
import { createUpdateProfileData } from '../data/user.helper';
import { Constants } from '../utilities/constants';

/**
 * TC002 - Verify updated account information is saved correctly.
 */
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
