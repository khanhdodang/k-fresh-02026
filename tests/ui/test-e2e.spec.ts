import { test } from '../../pages/base-page';
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';
import { Constants } from '../../utilities/constants';
import { generateOrderData } from '../../data/order.data';

let user: UserProfile;

test.describe('E2E Tests', () => {
  const billingUser = generateUserProfileData();
  const order = generateOrderData();

  test.beforeEach(async ({ commonPage, registerPage }) => {
      user = generateUserProfileData() as unknown as UserProfile;
      
      await commonPage.goto(Constants.REGISTER_URL);
      await registerPage.fillRegistrationForm(user);
      await registerPage.submitRegistrationForm();
      await registerPage.clickAgreeTermsCheckbox();
    });

  test('TC05 - E2E Add Checkout Process', async ({ checkoutPage, cartPage, productPage }) => {

    await test.step('Navigate to homepage', async () => {
      await checkoutPage.commonPage.goto(Constants.BASE_URL);
    });
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.setQuantity(1);
    await productPage.clickAddToCart();
    await productPage.clickViewCartLink();
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillBillingDetails(billingUser, order);
    await checkoutPage.clickAgreeTermsCheckbox();
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickPlaceOrderButton();
    await checkoutPage.verifyOrderSuccess();
  });
});
