import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';


export class AddressBookLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorsInitialization();
  }
  

  btnNewAddress!: Locator;
  inputFirstName!: Locator;
  inputLastName!: Locator;
  inputCompany!: Locator;
  inputAddress1!: Locator;
  inputAddress2!: Locator;
  inputCity!: Locator;
  inputPostCode!: Locator;
  selectCountry!: Locator;
  selectRegion!: Locator;
  btnBack!: Locator;

  locatorsInitialization(): void {
    super.locatorInitialization();
    this.btnNewAddress = this.page.locator('//a[contains(text(),"New Address")]');

    this.inputFirstName = this.page.locator('//input[@name="firstname"]');
    this.inputLastName = this.page.locator('//input[@name="lastname"]');
    this.inputCompany = this.page.locator('//input[@name="company"]');
    this.inputAddress1 = this.page.locator('//input[@name="address_1"]');
    this.inputAddress2 = this.page.locator('//input[@name="address_2"]');
    this.inputCity = this.page.locator('//input[@name="city"]');
    this.inputPostCode = this.page.locator('//input[@name="postcode"]');

    this.selectCountry = this.page.locator('//select[@name="country_id"]');
    this.selectRegion = this.page.locator('//select[@name="zone_id"]');
  }
  /**
   * Get dropdown option by label
   */
  getDropdownOption(selectName: string): Locator {
    return this.page.locator(`//select[@name="${selectName}"]`);
  }

  /**
    * Button back, edit, delete by text
  */
  actionButton(text: string): Locator {
    return this.page.locator(`//a[contains(text(),"${text}")]`);
  }

  /**
    * Country and Region option by label
  */
  countryRegionOption(selectName: 'country_id' | 'zone_id', option: string): Locator {
    return this.page.locator(
      `//select[@name="${selectName}"]/option[normalize-space()="${option}"]`
    );
  }

  /**
    * Default address radio by value
  */
  defaultRadio(option: '1' | '0'): Locator {
    return this.page.locator(
      `//input[@name="default" and @value="${option}"]`
    );
  }

  /**
    * Failue message for required fields
  */
  fieldError(field: string): Locator {
    return this.page.locator(
      `//input[@name="${field}"]/following-sibling::div[contains(@class,"text-danger")]`
    );
  }

  /**
    * Failue message for region fields
  */
  regionError(): Locator {
    return this.page.locator(
      '//select[@name="zone_id"]/../div[contains(@class,"text-danger")]'
    );
  }

  /**
   * Label message
   */
  lblMessage(text: string): Locator {
    return this.page.locator(`.alert-${text}`).first();
  }
}