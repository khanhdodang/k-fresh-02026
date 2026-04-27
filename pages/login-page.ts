import test, { expect, Page } from '@playwright/test';
import { User } from '../models/user';
import { Constants } from '../utilities/constants';
import { Messages } from '../data/messages.data';
import { LoginLocators } from '../locators/login-locators';
import { step } from '../utilities/logging';
import { CommonPage } from './common-page';

export class LoginPage extends LoginLocators {

  commonPage: CommonPage;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
  }
   /**
   * Navigate to the login page
   * @param url The URL of the login page
   */
  @step('Navigating to Login page')
  async goto(): Promise<void> {
    await test.step('Navigating to Login page', async () => {
      await this.commonPage.goto(Constants.MY_ACCOUNT_LOGIN_URL);
    });
  }

  /**
   *  Logs in using the provided user credentials.
   * @param user An object containing the username and password for login.
   */
  @step('Log in with user credentials')
  async login(user: User): Promise<void> {
    await test.step(`Log in with username: ${user.username}`, async () => {
      await this.inputUsername.fill(user.username);
      await this.inputPassword.fill(user.password);
      await this.btnLogin.click();
    });
  }
  
  /**
   * Asserts that the login was successful by checking the URL and the presence of a success message.
   */
  async expectSuccessfulLogin(): Promise<void> {
    await test.step('Verify successful login', async () => {
      await expect(this.page).toHaveURL(Constants.SECURE_URL);
      await expect(this.flashMessage).toContainText(Messages.SUCCESS_MESSAGE);
    });
  }
}
