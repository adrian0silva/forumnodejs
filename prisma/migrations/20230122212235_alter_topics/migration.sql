/*
  Warnings:

  - A unique constraint covering the columns `[boardId,userId]` on the table `topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "topics_boardId_key";

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "topics_boardId_userId_key" ON "topics"("boardId", "userId");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
