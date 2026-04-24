import { Page } from '@playwright/test';
import { CommonLocators } from './common-locators';


export class ProfileLocators extends CommonLocators {

  constructor(page: Page) {
    super(page);
    this.locatorInitialization();
  }
  

  locatorInitialization(): void {
    super.locatorInitialization();
  }
}