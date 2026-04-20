import { expect } from '@playwright/test';
import { User } from '../models/user';
import { Constants } from '../utilities/constants';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage extends LoginLocators {

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
    await this.page.fill( this.inputUsername, user.username);
    await this.page.fill(this.inputPassword, user.password);
    await this.btnSubmit.click
  }

  /**
   * Asserts that the login was successful by checking the URL and the presence of a success message.
   */
  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(Constants.SECURE_URL);
    await expect(this.page.locator(this.flashMessage)).toContainText(Constants.SUCCESS_MESSAGE);
  }
}
