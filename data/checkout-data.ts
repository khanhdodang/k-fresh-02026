import { Address } from '../models/address';
import { UserProfile } from '../models/user';

export function generateUserProfile(): UserProfile {
    const timestamp = new Date().getTime();
    return {
        email: `tester_${timestamp}@automation.com`,
        firstName: 'Dung',
        lastName: 'Luong',
        password: 'Password123!',
        phone: '0901234567'
    };
}

export function generateAddress(): Address {
    return {
        street: '123 Nguyen Van Cu',
        city: 'Ho Chi Minh',
        state: '3200', 
        zipCode: '700000'
    };
}