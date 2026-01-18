import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiBody({ type: CreateTodoDto })
  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.service.create(dto);
  }
  @ApiOperation({ summary: 'Get todo items by user ID' })
  @Get(':userId')
  getByUser(@Param('userId') userId: string) {
    return this.service.getByUser(userId);
  }
  @ApiOperation({ summary: 'Update a todo item by ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.service.update(id, dto);
  }
  @ApiOperation({ summary: 'Delete a todo item by ID' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
