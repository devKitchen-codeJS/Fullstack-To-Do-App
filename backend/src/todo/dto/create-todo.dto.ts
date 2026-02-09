import { Priority, TaskStatus } from '@prisma/client';

export class CreateTodoDto {
  title: string;
  description?: string;

  status: TaskStatus;
  priority: Priority;

  position?: number;
  dueDate?: Date;

  userId: string;

  task_notes?: string[];
}
