export class Constants {
  static readonly ENV = process.env.ENV ?? 'qa';
  private static readonly RAW_BASE_URL =
  process.env.BASE_URL ?? 'https://ecommerce-playground.lambdatest.io';
  static readonly BASE_URL = Constants.RAW_BASE_URL.replace(/\/+$/, '');
  static readonly LOGIN_URL = `${Constants.BASE_URL}/index.php?route=account/login`;
  static readonly REGISTER_URL = `${Constants.BASE_URL}/index.php?route=account/register`;
  static readonly MY_ACCOUNT_URL = `${Constants.BASE_URL}/index.php?route=account/account`;
  static readonly UPDATE_PROFILE_URL = `${Constants.BASE_URL}/index.php?route=account/edit`;
  static readonly CHANGE_PASSWORD_URL = `${Constants.BASE_URL}/index.php?route=account/password`;
  static readonly ADDRESS_BOOK_URL = `${Constants.BASE_URL}/index.php?route=account/address`;
  static readonly ADD_ADDRESS_URL = `${Constants.BASE_URL}/index.php?route=account/address/add`;
  static readonly LOGOUT_URL = `${Constants.BASE_URL}/index.php?route=account/logout`;
  static readonly LOGOUT_REDIRECT_URL = `${Constants.BASE_URL}/index.php?route=common/home`;

  static readonly LOGIN_EMAIL = process.env.LOGIN_USERNAME ?? '';
  static readonly LOGIN_PASSWORD = process.env.LOGIN_PASSWORD ?? '';

  static readonly ACCOUNT_UPDATE_SUCCESS_MESSAGE = 'Success: Your account has been successfully updated.';
  static readonly CHANGE_PASSWORD_SUCCESS_MESSAGE = 'Success: Your password has been successfully updated.';
  static readonly ADD_ADDRESS_SUCCESS_MESSAGE = 'Your address has been successfully added';
  static readonly LOGOUT_CONFIRM_MESSAGE = 'You have been logged off your account';
}