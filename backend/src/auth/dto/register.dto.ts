/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'test@email.com', description: 'User email' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'strongpassword', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: false,
  })
  @IsString()
  name?: string;
}
