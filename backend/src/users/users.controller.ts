import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @ApiOperation({
    summary: 'Create a new user',
    description:
      'Creates a new user with the provided email, password, and optional Google ID.',
  })
  @ApiOkResponse({
    description: 'User created successfully.',
    type: CreateUserDto,
  })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto.email, dto.password, dto.googleId);
  }
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a user by their unique ID.',
  })
  @ApiOkResponse({ description: 'User found successfully.' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
  @ApiOperation({
    summary: 'Get user by email',
    description: 'Retrieves a user by their email address.',
  })
  @ApiOkResponse({ description: 'User found successfully.' })
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }
}
