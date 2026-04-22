export class Constants {
  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/login`;
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly SUCCESS_MESSAGE = 'You logged into a secure area!';
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'tomsmith';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';
}
