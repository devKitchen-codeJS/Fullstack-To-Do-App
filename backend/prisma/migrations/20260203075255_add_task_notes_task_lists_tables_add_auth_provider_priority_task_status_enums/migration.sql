/*
  Warnings:

  - You are about to drop the column `completed` on the `todos` table. All the data in the column will be lost.
  - The `priority` column on the `todos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."AuthProvider" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterEnum
ALTER TYPE "public"."RoleType" ADD VALUE 'MARKETPLACEOWNER';

-- AlterTable
ALTER TABLE "public"."todos" DROP COLUMN "completed",
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "public"."TaskStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "taskListId" TEXT,
DROP COLUMN "priority",
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'LOW';

-- CreateTable
CREATE TABLE "public"."task_notes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "todoId" TEXT,

    CONSTRAINT "task_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "task_lists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "public"."task_lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_notes" ADD CONSTRAINT "task_notes_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "public"."todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_lists" ADD CONSTRAINT "task_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
