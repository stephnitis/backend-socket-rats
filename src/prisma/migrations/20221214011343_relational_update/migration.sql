/*
  Warnings:

  - You are about to drop the `_TripToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_B_fkey";

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TripToUser";

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
