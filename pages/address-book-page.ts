import { expect, Page, test } from '@playwright/test';
import { AddressLocators } from '../locators/address-book-locators';
import { Address } from '../models/address';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { Constants } from '../utilities/constants';

export class AddressBookPage extends AddressLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Navigate to Address Book page
   */
  @step('Navigating to Address Book page')
  async goto(): Promise<void> {
    await test.step('Navigating to Address Book page', async () => {
      await this.page.goto(Constants.ADDRESS_BOOK_URL);
    });
  }

  /**
   * Click New Address button
   */
  @step('Clicking New Address button')
  async clickNewAddress(): Promise<void> {
    await test.step('Clicking New Address button', async () => {
      await this.btnNewAddress.click();
    });
  }

  /**
   * Fill address form
   */
  @step('Filling address information')
  async fillAddressForm(address: Address): Promise<void> {
    await test.step('Filling address information', async () => {
      await this.inputFirstName.fill(address.firstName);
      await this.inputLastName.fill(address.lastName);
      await this.inputCompany.fill(address.company);
      await this.inputAddress1.fill(address.address1);
      await this.inputAddress2.fill(address.address2);
      await this.inputCity.fill(address.city);
      await this.inputPostCode.fill(address.postCode);

      await this.selectCountry.selectOption({ label: address.country });
      await expect(this.selectRegion).toBeEnabled();
      await this.selectRegion.selectOption({ label: address.region });
    });
  }

  /**
   * Leaving all fields blank 
   */
  @step('Leaving all fields blank and submitting the form')
  async submitEmptyAddressForm(): Promise<void> {
    await test.step('Leaving all fields blank and submitting the form', async () => {
      await this.btnContinue.click();
    });
  }

  /**
   * Submit address form
   */
  @step('Submitting address form')
  async submit(): Promise<void> {
    await test.step('Submitting address form', async () => {
      await this.btnContinue.click();
    });
  }

  /**
   * Verify success message
   */
  @step('Verifying address added successfully')
  async verifySuccess(): Promise<void> {
    await test.step('Verifying address added successfully', async () => {
      await expect(this.successMessage).toContainText(
        'Your address has been successfully added'
      );
    });
  }
  /**
 * Verify failure message
 */
  @step('Verify required field validation messages')
  async verifyRequiredFieldErrors(): Promise<void> {
    await expect(this.fieldError('firstname')).toHaveText(
      'First Name must be between 1 and 32 characters!'
    );

    await expect(this.fieldError('lastname')).toHaveText(
      'Last Name must be between 1 and 32 characters!'
    );

    await expect(this.fieldError('address_1')).toHaveText(
      'Address must be between 3 and 128 characters!'
    );

    await expect(this.fieldError('city')).toHaveText(
      'City must be between 2 and 128 characters!'
    );

    await expect(this.regionError()).toHaveText(
      'Please select a region / state!'
    );
  }

  /**
   * Click Edit button of the first address in the list
   */
  @step('Clicking Edit button of the first address')
  async clickEditFirstAddress(): Promise<void> {
    await test.step('Click edit button of the first address', async () => {
      await this.btnEdit.first().click();
    });
  }

  /**
   * Verify success message after updating address
   */
  @step('Verifying address updated successfully')
  async verifyUpdateSuccess(): Promise<void> {
    await test.step('Verifying address updated successfully', async () => {
      await expect(this.successMessage).toContainText(
        'Your address has been successfully updated'
      );
    })
  }

  /**
 * Click Delete button of the address in the list
 */
  @step('Click Delete button of the last address')
  async clickDeleteLastAddress(): Promise<void> {
    await test.step('Click Delete button of the last address', async () => {
      const total = await this.btnDelete.count();

      await this.btnDelete.nth(total - 1).click();
    });
  }
  /**
* Click Delete button of the address in the list
*/
  @step('Click Delete button of the default address')
  async clickDelDefaultAddress(): Promise<void> {
    await test.step('Click Delete button of the last address', async () => {
      await this.btnDelete.first().click();
    });
  }

  /**
   * Verify success message after deleting address
   */
  @step('Verifying address deleted successfully')
  async verifyDeleteSuccess(): Promise<void> {
    await test.step('Verifying address deleted successfully', async () => {
      await expect(this.successMessage).toContainText(
        'Your address has been successfully deleted'
      );
    })
  }

  /** 
   * Verify default address cannot be deleted
   */
  @step('Verifying default address cannot be deleted')
  async verifyDeleteFail(): Promise<void> {
    await expect(this.failureMessage).toContainText(
      'Warning: You can not delete your default address!'
    );
  }


}