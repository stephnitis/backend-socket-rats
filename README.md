# backend-socket-rats

- psql postgres

model User {
  id String @id @default(cuid())
  username String @unique
  email String @unique
  name String
  birthday DateTime @db.Date
  contact String
  emergencyContact String
  insuranceProvider String
  medications String
  allergies String
  communicationDifficulties String
  preferredTreatments String
}
