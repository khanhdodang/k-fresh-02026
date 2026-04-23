export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL =
    process.env.LOGIN_URL ||
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/login';
  static readonly WISHLIST_URL =
    process.env.WISHLIST_URL ||
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist';
  static readonly HOME_URL = process.env.HOME_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly SUCCESS_MESSAGE = 'You logged into a secure area!';
  static readonly LOGIN_EMAIL = process.env.LOGIN_EMAIL || '';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';
}
