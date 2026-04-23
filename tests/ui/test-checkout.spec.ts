import { test } from '../../pages/base-page';
import { generateUserProfile } from '../../data/checkout-data';
import { Logger } from '../../utilities/logger';
import { Constants } from '../../utilities/constants';

// Set the global timeout for all test cases within this specific test suite
test.setTimeout(Constants.TEST_TIMEOUT);

/**
 * @title Checkout Process Test Suite
 * @description Contains End-to-End (E2E) UI tests validating the e-commerce Checkout flow.
 * Scenarios cover new/existing address forms, validation rules, dynamic cart math calculations, 
 * and UI state toggles based on user interactions.
 */
test.describe('Checkout Tests', () => {
  /**
  * Setup hook executed before each test case in this suite.
  * Pre-conditions:
  * 1. Generates a new user profile and completes the registration flow.
  * 2. Injects a mock product into the shopping cart to bypass the "Empty Cart" blockage.
  */
  test.beforeEach(async ({ registerPage, productPage }) => {
    Logger.info('--- Start Setup Pre-condition (Registration Mode) ---');

    const newUser = generateUserProfile();

    await registerPage.fillRegistrationForm(newUser);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
    await registerPage.expectSuccessfulRegistration();
    await productPage.addSpecificItemToCart('59');
  });

  // ==========================================
  // TEST SCENARIOS
  // ==========================================

  /**
   * TC_CHK_003: Verify validation error messages for mandatory fields.
   * @description Tests the robust form validation by intentionally clearing mandatory 
   * inputs and asserting that the system blocks progression and displays appropriate error text.
   */
  test('TC_CHK_003: Verify multiple validation error messages when mandatory fields are left blank', async ({ checkoutPage, cartPage }) => {
    Logger.info('Start TC_CHK_003: Form Validation Error Handling');

    await cartPage.clickCheckoutButton();
    await checkoutPage.clearBillingAddressForm();
    await checkoutPage.clearShippingAddressForm();
    await checkoutPage.acceptTermsAndContinue();
    await checkoutPage.clickContinueButton(); 

    // Assert the visibility of UI validation error messages
    await checkoutPage.verifyBillingValidationErrors();
    await checkoutPage.verifyShippingValidationErrors();

    Logger.info('TC_CHK_003 completed successfully!');
  });

});