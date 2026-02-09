import { Priority, TaskStatus } from '@prisma/client';

export class UpdateTodoDto {
  title?: string;
  description?: string;

  status?: TaskStatus;
  priority?: Priority;

  position?: number;
  dueDate?: Date;
}
