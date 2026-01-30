/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  // -------------------------
  // REGISTRATION
  // -------------------------
  async register(dto: RegisterDto) {
    const user = await this.usersService.createUser(dto.email, dto.password);

    const tokens = await this.generateTokens(user.id, dto.email);

    return {
      user,
      ...tokens,
    };
  }

  // -------------------------
  // LOGIN
  // -------------------------
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, dto.email);

    return {
      user,
      ...tokens,
    };
  }

  // -------------------------
  // GENERATE TOKENS
  // -------------------------
  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m', // живет 15 минут
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '30d', // живет 30 дней
    });

    return { accessToken, refreshToken };
  }

  // -------------------------
  // REFRESH TOKEN
  // -------------------------
  async refresh(refreshToken: string) {
    try {
      const data = await this.jwt.verifyAsync(refreshToken);

      return this.generateTokens(data.sub, data.email);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // -------------------------
  // VERIFY ACCESS TOKEN
  // -------------------------
  async verifyAccessToken(accessToken: string) {
    try {
      const payload = await this.jwt.verifyAsync(accessToken);

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
