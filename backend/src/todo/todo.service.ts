import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/prisma';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  getByUser(userId: string) {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  update(id: string, dto: UpdateTodoDto) {
    return this.prisma.todo.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
