import { RoleType } from '@prisma/client';

export interface ITokenPayload {
  userId: string;
  email: string;
  role: RoleType;
}
export interface IUser {
  id: string;
  email: string;
}
