export interface UserRegisterInfo {
  name: string;
  email: string;
  password: string;
  errors?: any;
  avatar?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
  errors?: any;
}

export interface AuthInterface {
  auth: Auth;
  errors?: any;
}

export interface Auth {
  isAuthenticated: boolean;
  user: UserRegisterInfo;
}
