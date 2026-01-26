import { RoleType } from '@prisma/client';

export interface ITokenPayload {
  userId: string;
  email: string;
  role: RoleType;
}
