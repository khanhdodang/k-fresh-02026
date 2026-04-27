export interface User {
  username: string;
  password: string;
}
export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  telephone: string;
}

export type DefaultAddressOption = 'yes' | 'no';

export interface AddressData {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  region: string;
  defaultAddress: DefaultAddressOption;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}
export interface RegisterAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}
