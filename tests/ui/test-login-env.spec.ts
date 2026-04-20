import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { loadUserFromJson } from '../../data/user.helper';
import { Constants } from '../../utilities/constants';

const user = loadUserFromJson(Constants.ENV);

console.log(`Testing login with user from ${Constants.ENV} environment:`, user);

test(`login using users.json for ${Constants.ENV} environment`, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.commonPage.goto(Constants.LOGIN_URL);
  await loginPage.login(user);
  await loginPage.expectSuccessfulLogin();
});
