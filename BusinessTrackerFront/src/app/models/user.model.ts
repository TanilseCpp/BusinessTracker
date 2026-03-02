export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
