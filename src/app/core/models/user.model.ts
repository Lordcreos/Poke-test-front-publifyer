export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  VISITOR = 'visitor'
}

interface UserBase {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  hasReference: boolean;
  role: UserRole;
}

export interface NewUser extends UserBase {
  password: string;
}

export interface User extends UserBase {
  id: string;
}

export interface UserEntity extends UserBase {
  id: string;
  password: string;
}
