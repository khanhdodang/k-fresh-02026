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
   *  Logs in using the provided user credentials.
   * @param user An object containing the username and password for login.
   */
  @step('Log in with user credentials')
  async login(user: User): Promise<void> {

    await this.page.waitForURL(/login/);

    await this.inputUser.waitFor({ state: 'visible' });

    await this.inputUser.fill(user.username);
    await this.inputPassword.fill(user.password);
    await this.submitButton.click();
  }
  /**
   * Asserts that the login was successful by checking the URL and the presence of a success message.
   */
  async expectSuccessfulLogin(): Promise<void> {
    await test.step('Verify successful login', async () => {
      await expect(this.page).toHaveURL(Constants.SECURE_URL);
      await expect(this.flashMessage).toBeVisible();
    });
  }
}
