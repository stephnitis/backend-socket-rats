-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DISPATCH', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "contact" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "insuranceProvider" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "communicationDifficulties" TEXT NOT NULL,
    "preferredTreatments" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "trailName" TEXT NOT NULL,
    "startTime" TIMETZ NOT NULL,
    "returnTime" TIMETZ NOT NULL,
    "routeDetails" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TripToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TripToUser_AB_unique" ON "_TripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TripToUser_B_index" ON "_TripToUser"("B");

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
