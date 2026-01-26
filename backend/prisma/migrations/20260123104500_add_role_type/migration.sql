-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."RoleType" NOT NULL DEFAULT 'USER';
