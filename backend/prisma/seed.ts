/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// prisma/seed.ts
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Очистка существующих данных (опционально)
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});

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

  // 3. Создание задач для пользователя
  await prisma.todo.createMany({
    data: [
      {
        userId: alice.id,
        title: 'Купить молоко',
        description: 'Обезжиренное, 1 литр',
        completed: false,
        priority: 2,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      {
        userId: alice.id,
        title: 'Закончить отчет',
        description: 'Секция 3 и 4',
        completed: true,
        priority: 1,
      },
      {
        userId: alice.id,
        title: 'Позвонить другу',
        completed: false,
        priority: 0,
      },
    ],
  });

  console.log(`Создано 3 задачи для пользователя ${alice.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
