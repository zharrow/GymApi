/*
  Warnings:

  - The values [ALL] on the enum `GymAccess` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gymId` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Gym` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStart` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `badgeId` on the `UserBadge` table. All the data in the column will be lost.
  - Added the required column `userBadgeId` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GymAccess_new" AS ENUM ('SINGLE', 'NATIONAL', 'WORLD');
ALTER TABLE "Subscription" ALTER COLUMN "gymAccess" TYPE "GymAccess_new" USING ("gymAccess"::text::"GymAccess_new");
ALTER TYPE "GymAccess" RENAME TO "GymAccess_old";
ALTER TYPE "GymAccess_new" RENAME TO "GymAccess";
DROP TYPE "GymAccess_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Enterprise" DROP CONSTRAINT "Enterprise_gymId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_badgeId_fkey";

-- DropIndex
DROP INDEX "Manager_email_key";

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "userBadgeId" INTEGER DEFAULT NULL;

-- AlterTable
ALTER TABLE "Enterprise" DROP COLUMN "gymId";

-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "userId",
ADD COLUMN     "enterpriseId" INTEGER DEFAULT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "duration" INTEGER,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionEnd",
DROP COLUMN "subscriptionId",
DROP COLUMN "subscriptionStart";

-- AlterTable
ALTER TABLE "UserBadge" DROP COLUMN "badgeId";

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gym" ADD CONSTRAINT "Gym_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_userBadgeId_fkey" FOREIGN KEY ("userBadgeId") REFERENCES "UserBadge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
