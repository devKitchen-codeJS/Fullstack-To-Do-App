import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'shared/prisma';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    TodoModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
