import { test } from '../../pages/base-page';
import { user } from '../../data/login.data';
import { generateAddressData } from '../../data/address.data';

test.describe('Address Book', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(user);
  });

  test.only('TC_01 - Add new address successfully', async ({ addressBookPage }) => {
    const addressData = generateAddressData();
    await addressBookPage.goto();
    await addressBookPage.clickNewAddress();
    await addressBookPage.fillAddressForm(addressData);
    await addressBookPage.clickSubmit();
    await addressBookPage.verifySuccess();
  });

  test.only('TC_02 - Add new address with required fields empty', async ({ addressBookPage }) => {
    await addressBookPage.goto();
    await addressBookPage.clickNewAddress();
    await addressBookPage.clickSubmit();
    await addressBookPage.verifyRequiredFieldErrors();
  });

  test.only('TC_03 - Edit existing address successfully', async ({ addressBookPage }) => {
    const updatedAddressData = generateAddressData();
    await addressBookPage.goto();
    await addressBookPage.clickEditFirstAddress();
    await addressBookPage.fillAddressForm(updatedAddressData);
    await addressBookPage.clickSubmit();
    await addressBookPage.verifyUpdateSuccess();
  });

  test.only('TC_04 - Delete existing address successfully', async ({ addressBookPage }) => {
    await addressBookPage.goto();
    await addressBookPage.clickDeleteLastAddress();
    await addressBookPage.verifyDeleteSuccess();
  });

  test.only('TC_05 - Delete default address failure', async ({ addressBookPage }) => {
    await addressBookPage.goto();
    await addressBookPage.clickDelDefaultAddress();
    await addressBookPage.verifyDeleteFail();
  });
});
