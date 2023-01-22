-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "forumId" TEXT NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
