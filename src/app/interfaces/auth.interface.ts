export interface LoginUser{
  email:string,
  password:string
}

export interface AuthResponse {
  USER: User;
}

export interface User {
  token: string;
  user:  UserClass;
}

export interface UserClass {
  name:    string;
  surname: string;
  email:   string;
}

export interface UserRegister {
  email:    string;
  name:     string;
  surname:  string;
  password: string;
  rol:      string;
}
