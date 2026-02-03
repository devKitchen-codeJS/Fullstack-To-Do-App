/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// prisma/seed.ts
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Priority, PrismaClient, TaskStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Очистка существующих данных (опционально)
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.taskList.deleteMany({});
  await prisma.taskNotes.deleteMany({});
  console.log('Очистка данных завершена.');

  // 2. Создание тестового пользователя
  const hashedPassword = await bcrypt.hash('testpassword', 10);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice User',
      password: hashedPassword,
    },
  });

  console.log(`Создан пользователь: ${alice.name} (${alice.email})`);

  const mainList = await prisma.taskList.create({
    data: {
      name: 'Основные задачи',
      description: 'Личный todo-лист',
      userId: alice.id,
    },
  });

  // 3. Создание задач для пользователя
  const todos = await prisma.todo.createMany({
    data: [
      {
        userId: alice.id,
        title: 'Купить молоко',
        description: 'Обезжиренное, 1 литр',
        status: TaskStatus.PENDING,
        priority: Priority.LOW,
        position: 1,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      {
        userId: alice.id,
        title: 'Закончить отчет',
        description: 'Секция 3 и 4',
        status: TaskStatus.PENDING,
        priority: Priority.LOW,
        position: 1,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        taskListId: mainList.id,
      },
      {
        userId: alice.id,
        title: 'Позвонить другу',
        status: TaskStatus.PENDING,
        priority: Priority.LOW,
        position: 1,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        taskListId: mainList.id,
      },
    ],
  });

  console.log(`Создано 3 задачи для пользователя ${alice.name}`);

  // await prisma.taskNotes.create({
  //   data: {
  //     content: 'Это заметка для задачи',
  //     todoId: todos[0]?.id || '',
  //   },
  // });
  // console.log('Созданы заметки для задачи.');
  /*
  Needed for fixes: 
  add relation to User model to track note ownership and ensure data integrity.
  add asignment of notes to specific users for better management.
  */
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
