import type { User } from '../models/user';
import { Constants } from '../utilities/constants';

export const user: User = {
  username: Constants.LOGIN_USERNAME,
  password: Constants.LOGIN_PASSWORD,
};
