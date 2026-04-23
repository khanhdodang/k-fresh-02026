import { test } from '../../pages/base-page';
import { loadUserFromJson } from '../../data/user.helper';
import { Constants } from '../../utilities/constants';

const user = loadUserFromJson(Constants.ENV);

console.log(`Testing login with user from ${Constants.ENV} environment:`, user);