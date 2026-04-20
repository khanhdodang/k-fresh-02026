import { test } from '@playwright/test';
import { user } from '../../data/login.data';
import { LoginPage } from '../../pages/login.page';
import { Constants } from '../../utilities/constants';

test('login on the-internet secure area', async ({ page }) => {
  console.log(user);
  const loginPage = new LoginPage(page);
  await loginPage.commonPage.goto(Constants.LOGIN_URL);
  await loginPage.login(user);
  await loginPage.expectSuccessfulLogin();
});
