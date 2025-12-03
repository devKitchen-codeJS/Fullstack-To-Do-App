/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  // -------------------------
  // REGISTRATION
  // -------------------------
  async register(email: string, password: string) {
    const user = await this.usersService.createUser(email, password);

    const tokens = await this.generateTokens(user.id, email);

    return {
      user,
      ...tokens,
    };
  }

  // -------------------------
  // LOGIN
  // -------------------------
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, email);

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
}
