import test, { expect, Page } from "@playwright/test";
import { Constants } from "../utilities/constants";
import { CommonPage } from "./common-page";
import { step } from "../utilities/logging";
import { AddressBookLocators } from "../locators/address-book-locators";
import { Address } from "../models/address";

export class AddressBookPage extends AddressBookLocators {
  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Clicks the "New Address" button to navigate to the address creation form.
   */
  @step("Click New Address Button")
  async clickNewAddressButton(): Promise<void> {
    // TODO: Implement the logic to click the "New Address" button using the locator defined in AddressBookLocators.
  }

  /**
   * Clicks the "Submit" button to save the new address.
   * This method is decorated with @step for reporting purposes.
   */
  @step("Click Submit Button")
  async clickSubmitButton(): Promise<void> {}

  /**
   * Fills the address form with the provided address data.
   * @param address
   */
  @step("Fill Address Form")
  async fillAddressForm(address: Address): Promise<void> {
    // TODO: Implement the logic to fill the address form with the provided address data.
  }

  /**
   * Verifies that the new address has been added successfully by checking for the presence of the address details on the page.
   * @param address
   */
  @step("Verify Address Added")
  async verifyAddressAdded(address: Address): Promise<void> {}

  /**
   * Verifies that the created address message is displayed.
   */
  @step("Verify Created Address Message")
  async verifyCreatedAddressMessage(): Promise<void> {}
}
