export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  errors?: Partial<Record<keyof LoginFormData, string[] | undefined>>;
  payload: { [key in keyof LoginFormData]: string };
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  errors?: Partial<Record<keyof SignupFormData, string[] | undefined>>;
  payload: { [key in keyof SignupFormData]: string };
}
