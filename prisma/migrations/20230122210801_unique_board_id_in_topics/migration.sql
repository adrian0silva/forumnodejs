/*
  Warnings:

  - A unique constraint covering the columns `[boardId]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "topics_boardId_key" ON "topics"("boardId");
