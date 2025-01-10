/*
  Warnings:

  - Made the column `userBadgeId` on table `Badge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enterpriseId` on table `Gym` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Badge" ALTER COLUMN "userBadgeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Gym" ALTER COLUMN "enterpriseId" SET NOT NULL;
