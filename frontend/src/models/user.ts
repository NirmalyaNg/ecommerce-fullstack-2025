export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isAdmin?: boolean;
  gender: 'Male' | 'Female' | 'Other';
};

export type User = Partial<UserData>;
