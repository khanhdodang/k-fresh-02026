import test, { expect, Page } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { CommonPage } from './common-page';
import { step } from '../utilities/logging';
import { HomeLocators } from '../locators/home-locators';

export class HomePage extends HomeLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }

  /**
   * Selects a menu item from the main navigation.
   * @param menuName The name of the menu item to select.
   */
  @step('Select Menu')
  async selectMenu(menuName: string): Promise<void> {
    await this.shopByCategoryMenu.click()
    await this.itemTopCategory(menuName).click()
  }
}
