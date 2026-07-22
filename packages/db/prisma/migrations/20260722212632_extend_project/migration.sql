/*
  Warnings:

  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "summary",
ADD COLUMN     "client" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contentHtml" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contentJson" JSONB,
ADD COLUMN     "excerpt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "industry" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "outcome" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "role" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "year" TEXT NOT NULL DEFAULT '';
