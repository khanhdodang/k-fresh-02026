import { test, expect } from '../pages/base-page';
import { createAddressData } from '../data/user.helper';
import { Constants } from '../utilities/constants';

/**
 * TC004 - Verify user can add a new address successfully.
 */
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
