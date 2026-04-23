export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/login`;
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly SUCCESS_MESSAGE = 'You logged into a secure area!';
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'tomsmith';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';

  static readonly ECOM_CHECKOUT_URL = `${Constants.BASE_URL}?route=checkout/checkout`;
  static readonly ECOM_PRODUCT_BASE_URL = `${Constants.BASE_URL}?route=product/product&product_id=`;
  static readonly ECOM_REGISTER_URL = `${Constants.BASE_URL}?route=account/register`;

  static readonly TIMEOUT_SHORT = 10000;
  static readonly TIMEOUT_MEDIUM = 20000;
  static readonly TIMEOUT_LONG = 60000;
  static readonly TEST_TIMEOUT = 90000;

  // --- PAUSE/WAIT DELAYS (Milliseconds) ---
  static readonly WAIT_TINY = 500;
  static readonly WAIT_SHORT = 1000;
  static readonly WAIT_MEDIUM = 2000;
  static readonly WAIT_LONG = 4000;
}
