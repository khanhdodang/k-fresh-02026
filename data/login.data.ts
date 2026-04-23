import type { User } from '../models/user';
import { Constants } from '../utilities/constants';

export const user: User = {
  email: Constants.LOGIN_EMAIL,
  password: Constants.LOGIN_PASSWORD,
};
