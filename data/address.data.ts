import { faker } from '@faker-js/faker';
import { Address } from '../models/address'; 

export const generateAddressData = (): Address => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),

    city: faker.location.city(),
    postCode: faker.location.zipCode(),

    country: 'United States',
    region: 'California',
  };
};