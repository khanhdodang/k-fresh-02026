export class Constants {
  static readonly ENV = process.env.ENV || "qa";
  static readonly BASE_URL =
    process.env.BASE_URL || "https://ecommerce-playground.lambdatest.io/";
  static readonly LOGIN_URL = `${Constants.BASE_URL}index.php?route=account/login`;
  static readonly SECURE_URL = `${Constants.BASE_URL}index.php?route=account/account`;
  static readonly SUCCESS_MESSAGE = "You logged into a secure area!";
  static readonly LOGIN_EMAIL =
    process.env.LOGIN_EMAIL || "qwer15102002@yahoo.com.vn";
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || "123456";
  static readonly USERS_JSON_FILE = "./data/users.json";
  static readonly PRODUCT_NAME = "HTC Touch HD";
  static readonly LOAD_STATE = {
    NETWORK_IDLE: "networkidle",
    DOM_CONTENT_LOADED: "domcontentloaded",
    LOAD: "load",
  } as const;
}
