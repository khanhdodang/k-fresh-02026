import { Locator, Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class AddressLocators extends CommonLocators {
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
  radioDefaultYes!: Locator;
  radioDefaultNo!: Locator;
  btnContinue!: Locator;
  btnBack!: Locator;
  successMessage!: Locator;
  failureMessage!: Locator;

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

    this.radioDefaultYes = this.page.locator(
      '//input[@name="default" and @value="1"]',
    );

    this.btnBack = this.page.locator('//a[contains(text(),"Back")]');
    this.btnContinue = this.page.locator('//input[@type="submit"]');

    this.btnEdit = this.page.locator('//a[contains(text(),"Edit")]');
    this.btnDelete = this.page.locator('//a[contains(text(),"Delete")]');

    this.successMessage = this.page.locator('.alert-success').first();
    this.failureMessage = this.page.locator('.alert-danger').first();
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
      `//select[@name="zone_id"]/../div[contains(@class,"text-danger")]`
    );
  }
}
