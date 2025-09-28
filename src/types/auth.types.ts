export type User = {
  id: number;
  name: string;
  email: string;
};

export type RegistrationSuccessData = {
  success: true;
  message: string;
  user: User;
  token: string;
};

export type RegistrationError = {
  success: false;
  error: string;
};

export type RegistrationResponse =
  | RegistrationSuccessData
  | RegistrationError;