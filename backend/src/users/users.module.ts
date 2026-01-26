import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'shared/prisma';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
