export interface User {
  username: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;

  password: string;
  confirmPassword?: string;
}
