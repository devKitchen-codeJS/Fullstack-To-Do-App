/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/users/dto/update-user.dto.ts

import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  // Email
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  readonly email?: string;

  // Password (for changing password)
  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must contain at least 8 characters.' })
  @MaxLength(50, {
    message: 'Password must contain no more than 50 characters.',
  })
  readonly password?: string;

  // name
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @MaxLength(100, { message: 'Name must contain no more than 100 characters.' })
  readonly name?: string;
}
