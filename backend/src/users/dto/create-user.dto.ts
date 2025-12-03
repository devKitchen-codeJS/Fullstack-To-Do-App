/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must contain at least 8 characters.' })
  @MaxLength(50, {
    message: 'Password must contain no more than 50 characters.',
  })
  readonly password: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @MaxLength(100, { message: 'Name must contain no more than 100 characters.' })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'Google ID must be a string.' })
  readonly googleId?: string;
}
