import { faker } from '@faker-js/faker';
import { Order } from '../models/order';

/**
 * Generates random order data using faker-js
 * @returns {Order} Random order data
 */
export const generateOrderData = (): Order => {
  return {
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    postcode: faker.location.zipCode(),
    country: 'United States',
    region: 'California',
  };
};