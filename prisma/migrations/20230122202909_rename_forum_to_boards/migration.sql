/*
  Warnings:

  - You are about to drop the column `forumId` on the `topics` table. All the data in the column will be lost.
  - You are about to drop the `forums` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boardId` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_forumId_fkey";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "forumId",
ADD COLUMN     "boardId" TEXT NOT NULL;

-- DropTable
DROP TABLE "forums";

-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
