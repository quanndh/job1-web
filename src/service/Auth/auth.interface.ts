export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResponseAuth {
  data: { lastName: string; email: string };
  token: string;
}

export interface SignupPayload {
  lastName: string;
  firstName: string;
  password: string;
  email: string;
}
