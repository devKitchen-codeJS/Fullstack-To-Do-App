import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto.email, dto.password, dto.googleId);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }
}
