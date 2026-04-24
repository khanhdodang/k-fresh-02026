import { test } from '../../pages/base-page';
import { user } from '../../data/login.data';
import { Constants } from '../../utilities/constants';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ commonPage }) => {
    await commonPage.goto(Constants.LOGIN_URL);
  });

});
