export class Constants {

  // Section timeouts
  static readonly TIMEOUTS = {
    DEFAULT: 60000,
    WAIT_LOCATOR: 60000,
    WAIT_ELEMENT_TIMEOUT: 30000,
    WAIT_ELEMENT_VISIBLE: 10000,
    WAIT_ELEMENT_INVISIBLE: 5000,
    PAGE_EVENT_LOAD: 60000,
    PAGE_NAVIGATE: 60000,
    POPUP_EVENT_LOAD: 30000,
    POPUP_EVENT_CLOSE_SECONDS: 2,
    BUFFER_STEP_SECONDS: 1,
    DOWNLOAD_FILE: 3000,
    SET_CUSTOME_VIEW: 3000,
    DOM_CONTENT_LOADED: 5000,
    DOM_CONTENT_LOADED_SECOND: 1,
    PERFORM_LOADING: 2,
  };

  static readonly WORKERS = Number(process.env.WORKERS ?? 6);
  static readonly LOCAL_WORKERS = Number(process.env.LOCAL_WORKERS ?? 6);

  static readonly MAX_RETRY_ATTEMPTS = 1;
  static readonly DATA_FOLDER = '../data';
  static readonly DOWNLOAD_FOLDER = '../downloads';
  static readonly CONFIGS_FOLDER = '../configs';
  static readonly OUTPUT_FOLDER = '../output';

  static readonly ENV = process.env.ENV || 'qa';
  static readonly BASE_URL = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/';
  static readonly LOGIN_URL = `${Constants.BASE_URL}/login`;
  static readonly REGISTER_URL = `${Constants.BASE_URL}/index.php?route=account/register`;
  static readonly SECURE_URL = `${Constants.BASE_URL}/secure`;
  static readonly LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'tomsmith';
  static readonly SUCCESS_MESSAGE = 'You logged into a secure area!';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
  static readonly USERS_JSON_FILE = './data/users.json';
  static readonly PRODUCT_JSON_FILE = './data/product.json';
  static readonly CATEGORY_URL = `${Constants.BASE_URL}/index.php?route=product/category&path=20`;
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

