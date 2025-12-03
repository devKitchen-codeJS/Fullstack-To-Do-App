export class CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: number;
  userId: string;
}
