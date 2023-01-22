/*
  Warnings:

  - A unique constraint covering the columns `[boardId]` on the table `topics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "topics_boardId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "topics_boardId_key" ON "topics"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "topics_userId_key" ON "topics"("userId");
