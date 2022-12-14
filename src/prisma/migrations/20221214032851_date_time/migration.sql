/*
  Warnings:

  - Changed the type of `startTime` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `returnTime` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "returnTime",
ADD COLUMN     "returnTime" TIMESTAMP(3) NOT NULL;
