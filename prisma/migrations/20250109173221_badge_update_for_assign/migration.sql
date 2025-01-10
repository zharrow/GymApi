/*
  Warnings:

  - You are about to drop the column `userBadgeId` on the `Badge` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_userBadgeId_fkey";

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "userBadgeId",
ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "_BadgeToUserBadge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeToUserBadge_AB_unique" ON "_BadgeToUserBadge"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeToUserBadge_B_index" ON "_BadgeToUserBadge"("B");

-- AddForeignKey
ALTER TABLE "_BadgeToUserBadge" ADD CONSTRAINT "_BadgeToUserBadge_A_fkey" FOREIGN KEY ("A") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToUserBadge" ADD CONSTRAINT "_BadgeToUserBadge_B_fkey" FOREIGN KEY ("B") REFERENCES "UserBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
