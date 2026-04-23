export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/login`;
  static readonly REGISTER_URL = `${Constants.BASE_URL}/index.php?route=account/register`;
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly PRODUCT_PAGE_URL = `${Constants.BASE_URL}/index.php?route=product/product&product_id=62&search=macbook+pro`;
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'tomsmith';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';
  static readonly PRODUCT_JSON_FILE = './data/product.json';
}