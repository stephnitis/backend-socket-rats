-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "coordinates" DROP NOT NULL,
ALTER COLUMN "routeDetails" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "insuranceProvider" DROP NOT NULL,
ALTER COLUMN "medications" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL,
ALTER COLUMN "communicationDifficulties" DROP NOT NULL,
ALTER COLUMN "preferredTreatments" DROP NOT NULL;
