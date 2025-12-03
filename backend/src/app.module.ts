import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'shared/prisma';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true, // Make JwtModule global
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
