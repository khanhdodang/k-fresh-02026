import { faker } from '@faker-js/faker';
import { UserProfile } from '../models/user';

/**
 * Generates random user data using faker-js
 * @returns {UserProfile} Random user data
 */
export const generateUserProfileData = (): UserProfile => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({
      firstName: `test_${Date.now()}`,
      provider: 'gmail.com',
    }),
    phone: faker.phone.number({ style: 'national' }),
    password: faker.internet.password({ length: 12 }),
  };
};
