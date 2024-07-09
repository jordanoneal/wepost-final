-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "upvotes" SET DEFAULT 0,
ALTER COLUMN "downvotes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "upvotes" SET DEFAULT 0,
ALTER COLUMN "downvotes" SET DEFAULT 0;
