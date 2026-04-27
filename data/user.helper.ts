import { faker } from '@faker-js/faker';
import {
  AddressData,
  DefaultAddressOption,
  RegisterData,
  UpdateProfileData,
  User,
} from '../models/user';
import { Constants } from '../utilities/constants';
import { ENV } from '../models';
import { readJsonFile } from '../utilities/jsonHandling';

const COUNTRY_REGIONS: Record<string, string[]> = {
  'United States': ['California', 'Florida', 'Texas', 'New York'],
  'Canada': ['Ontario', 'Quebec', 'Alberta', 'British Columbia'],
  'Australia': ['New South Wales', 'Victoria', 'Queensland'],
};

const DEFAULT_ADDRESS_OPTIONS: DefaultAddressOption[] = ['yes', 'no'];

/**
 * Creates random but valid profile data for account update test.
 */
export function createUpdateProfileData(): UpdateProfileData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    telephone: faker.string.numeric(10),
  };
}
/**
 * Returns one random country from predefined address country list.
 */
export function getRandomCountry(): string {
  return faker.helpers.arrayElement(Object.keys(COUNTRY_REGIONS));
}

/**
 * Returns one random region for the input country.
 */
export function getRandomRegionByCountry(country: string): string {
  const regions = COUNTRY_REGIONS[country];

  return faker.helpers.arrayElement(regions);
}

/**
 * Creates random address data.
 * Country and region are generated as one valid pair.
 */
export function createAddressData(): AddressData {
  const country = getRandomCountry();
  const region = getRandomRegionByCountry(country);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    postcode: faker.string.numeric(5),
    country,
    region,
    defaultAddress: faker.helpers.arrayElement(DEFAULT_ADDRESS_OPTIONS),
  };
}

/**
 * Creates a unique account for register/login flows.
 */
export function createRegisterData(): RegisterData {
  const uniqueId = faker.string.alphanumeric(10).toLowerCase();
  const password = createStrongPassword();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `qa.auto.${uniqueId}@example.com`,
    telephone: faker.string.numeric(10),
    password,
  };
}

/**
 * Creates a password that satisfies common password policies.
 */
export function createFakePassword(): string {
  return `Pw@${faker.string.alphanumeric({ length: 10, casing: 'mixed' })}9`;
}

/**
 * Creates a strong random password.
 * Alias maintained for consistency with existing test imports.
 */
export function createStrongPassword(): string {
  return createFakePassword();
}

/**
 * Gets login credentials from environment variables.
 */
export function getLoginCredentials(): User {
  if (!Constants.LOGIN_USERNAME || !Constants.LOGIN_PASSWORD) {
    throw new Error(
      `Missing LOGIN_USERNAME or LOGIN_PASSWORD in profiles/.env.${Constants.ENV}`,
    );
  }

  return {
    username: Constants.LOGIN_USERNAME,
    password: Constants.LOGIN_PASSWORD,
  };
}

/**
 * Loads user data from JSON by environment.
 */
export function loadUserFromJson(env = Constants.ENV): User {
  const normalizedEnv = env.toLowerCase() as ENV;

  return readJsonFile<User>(Constants.USERS_JSON_FILE, normalizedEnv);
}
