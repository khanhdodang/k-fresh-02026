import { expect, Page } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';
import { User } from '../models/user';
import { Constants } from '../utilities/constants';

export class LoginPage {
  constructor(private page: Page) {}

  /**
   * Navigates to the login page of the application.
   */
  async goto() {
    await this.page.goto(Constants.LOGIN_URL);
  }

  /**
   *  Logs in using the provided user credentials.
   * @param user An object containing the username and password for login.
   */
  async login(user: User) {
    console.log(`Attempting to log in with username: ${user.username}`);
    await this.page.fill(loginLocators.username, user.username);
    await this.page.fill(loginLocators.password, user.password);
    await this.page.click(loginLocators.submitButton);
  }

  /**
   * Asserts that the login was successful by checking the URL and the presence of a success message.
   */
  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(Constants.SECURE_URL);
    await expect(this.page.locator(loginLocators.flashMessage)).toContainText(Constants.SUCCESS_MESSAGE);
  }
}
