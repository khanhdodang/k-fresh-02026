// Use fakerVI for generating realistic Vietnamese user data and addresses, enhancing test relevance for VN market.
import { fakerVI as faker } from '@faker-js/faker';
import { Address } from '../models/address';
import { UserProfile } from '../models/user';

/** Generates a realistic Vietnamese user profile */
export function generateUserProfile(): UserProfile {
    return {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: faker.internet.password({ length: 12 }) + '1!Aa',
        phone: faker.phone.number()
    };
}

/**  Generates a realistic Vietnamese address */
export function generateAddress(): Address {
    return {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: '3200',
        zipCode: '700000'
    };
}
