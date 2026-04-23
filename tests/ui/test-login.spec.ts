import { test } from "../../pages/base-page";
import { user } from "../../data/login.data";
import { Constants } from "../../utilities/constants";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
  });

  test("login on the-internet secure area", async ({
    loginPage,
    commonPage,
  }) => {
    await loginPage.login(user);
    await loginPage.expectSuccessfulLogin();
  });
});
