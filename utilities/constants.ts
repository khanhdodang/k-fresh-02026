export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/index.php?route=account/login`;
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly SUCCESS_MESSAGE = 'You logged into a secure area!';
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'test@lambdatest.com';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';
  static readonly PRODUCTS_JSON_FILE = './data/products.json';

}


export const WAIT_SECONDS = {
  TIMEOUT: {
    DEFAULT: 5000,
    TOAST: 3000,
    PAGE_LOAD: 10000,
  },
  AFTER_CLICK: 1000,
  ELEMENT_VISIBLE: 3000,
  FOR_TIMEOUT: 500 ,
};

