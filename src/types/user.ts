export interface REGISTER {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface LOGIN {
  email: string;
  password: string;
}