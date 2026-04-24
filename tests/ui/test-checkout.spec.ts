import { test } from '../../pages/base-page';
import { generateUserProfile } from '../../data/checkout-data';
import { Logger } from '../../utilities/logger';
import { Constants } from '../../utilities/constants';
import { UserProfile } from '../../models/user';
import { Address } from '../../models/address';
import { generateAddress } from '../../data/checkout-data';

// Set the global timeout for all test cases within this specific test suite
test.setTimeout(Constants.TIMEOUTS.DEFAULT);

/**
 * @title Checkout Process Test Suite
 * @description Contains End-to-End (E2E) UI tests validating the e-commerce Checkout flow.
 * Scenarios cover new/existing address forms, validation rules, dynamic cart math calculations, 
 * and UI state toggles based on user interactions.
 */
test.describe('Checkout Tests', () => {
  const targetProduct = 'HP LP3065';

  let buyerProfile: UserProfile;
  let buyerAddress: Address;

  let receiverProfile: UserProfile;
  let receiverAddress: Address;

  /**
   * Setup hook executed before each test case in this suite.
   */
  test.beforeEach(async ({ registerPage, productPage }) => {
    Logger.info('--- Start Setup Pre-condition (Registration Mode) ---');

    buyerProfile = generateUserProfile();
    buyerAddress = generateAddress();

    receiverProfile = generateUserProfile();
    receiverAddress = generateAddress();

    await registerPage.fillRegistrationForm(buyerProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
    await registerPage.expectSuccessfulRegistration();

    await productPage.buySpecificItemNow(targetProduct);
  });

  // =========================================================================

  /**
   * TC_CHK_001: Verify checkout flow when shipping address is different from billing address.
   */
  test('TC_CHK_001: Verify successful checkout using a different shipping address', async ({ checkoutPage }) => {
    await checkoutPage.fillBillingDetails(buyerProfile, buyerAddress);
    await checkoutPage.verifyShippingSectionVisible();
    await checkoutPage.fillShippingDetails(receiverProfile, receiverAddress);
    await checkoutPage.setTermsAndConditions(true);
    await checkoutPage.clickContinueButton();
    await checkoutPage.confirmOrderAndVerifySuccess();
  });

  /**
  * TC_CHK_002: Verify validation recovery when toggling "Same Address" checkbox.
  */
  test('TC_CHK_002: Verify checkout recovers successfully when toggling shipping address states', async ({ checkoutPage }) => {
    await checkoutPage.fillBillingDetails(buyerProfile, buyerAddress);
    await checkoutPage.verifyShippingSectionVisible();
    await checkoutPage.setTermsAndConditions(true);
    await checkoutPage.clickContinueButton();
    await checkoutPage.verifyShippingValidationErrors();
    await checkoutPage.toggleSameAddressCheckbox(true);
    await checkoutPage.clickContinueButton();
    await checkoutPage.confirmOrderAndVerifySuccess();
  });

  /**
   * TC_CHK_003: Verify validation error messages for mandatory fields.
   */
  test('TC_CHK_003: Verify multiple validation error messages when mandatory fields are left blank', async ({ checkoutPage }) => {
    await checkoutPage.clickContinueButton();
    await checkoutPage.verifyBillingValidationErrors();
  });

  /**
   * TC_CHK_004: Mandatory Terms Check - Verify error when Terms & Conditions are not accepted.
   */
  test('TC_CHK_004: Mandatory Terms Check - Verify error when Terms & Conditions are not accepted', async ({ checkoutPage }) => {
    await checkoutPage.fillBillingDetails(buyerProfile, buyerAddress);
    await checkoutPage.setTermsAndConditions(false);
    await checkoutPage.clickContinueButton();
    await checkoutPage.verifyTermsWarningMessage();
    await checkoutPage.setTermsAndConditions(true);
    await checkoutPage.clickContinueButton();
  });

  /**
   * TC_CHK_005: New User Happy Path - Complete checkout from scratch.
   */
  test('TC_CHK_005: New User Happy Path - Complete checkout from scratch', async ({ checkoutPage }) => {
    await checkoutPage.fillBillingDetails(buyerProfile, buyerAddress);
    await checkoutPage.verifySameAddressIsChecked();
    await checkoutPage.verifyDefaultDeliveryAndPayment();
    await checkoutPage.addOrderComment('This is my first order! Please handle with care.');
    await checkoutPage.setTermsAndConditions(true);
    await checkoutPage.clickContinueButton();
    await checkoutPage.confirmOrderAndVerifySuccess();
  });
});
