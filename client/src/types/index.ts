export interface UserRegisterInfo {
  name: string;
  email: string;
  password: string;
  errors?: any;
}

export interface LoginInfo {
  email: string;
  password: string;
}