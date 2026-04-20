import { test } from '@playwright/test';
import { user } from '../../data/login.data';
import { LoginPage } from '../../pages/login.page';

test('login on the-internet secure area', async ({ page }) => {
  console.log(user);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(user);
  await loginPage.expectSuccessfulLogin();
});
