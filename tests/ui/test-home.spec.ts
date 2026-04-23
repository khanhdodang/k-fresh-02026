import { test } from "../../pages/base-page";
import { user } from "../../data/login.data";
import { Constants } from "../../utilities/constants";

test.describe("Home Tests", () => {
  test.beforeEach(async ({ commonPage, loginPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
    await loginPage.login(user);
  });

  test("verify abc", async ({}) => {});
});
