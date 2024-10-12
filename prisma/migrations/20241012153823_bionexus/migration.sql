-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'model');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'RARELY');

-- CreateEnum
CREATE TYPE "SymptomName" AS ENUM ('HEADACHE', 'NAUSEA', 'VOMITING', 'DIARRHEA', 'FATIGUE', 'DIZZINESS', 'INSOMNIA', 'CONSTIPATION', 'MUSCLE_PAIN', 'JOINT_PAIN', 'OTHER');

-- CreateEnum
CREATE TYPE "Adherence" AS ENUM ('ALWAYS', 'OFTEN', 'SOMETIMES', 'NEVER', 'RARELY');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('HAPPY', 'SAD', 'ANGRY', 'ANXIOUS', 'STRESSED', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "Sleep" AS ENUM ('GOOD', 'BAD', 'AVERAGE');

-- CreateEnum
CREATE TYPE "Stress" AS ENUM ('NOT_STRESSED', 'SLIGHTLY', 'MODERATELY', 'HIGHLY', 'EXTREMELY');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT,
    "age" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "gender" TEXT,
    "bloodGroup" TEXT,
    "medicalIssues" TEXT,
    "stripe_customer_id" TEXT,
    "stripe_invoice_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" "SymptomName" NOT NULL,
    "intensity" INTEGER NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "loggedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "purpose" TEXT,
    "frequency" "Frequency" NOT NULL,
    "adherence" "Adherence" NOT NULL,
    "startDate" TIMESTAMP(3),

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "MentalWellness" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" "Mood" NOT NULL,
    "happiness" INTEGER NOT NULL,
    "sleep" "Sleep" NOT NULL,
    "stress" "Stress" NOT NULL,
    "anxiety" TEXT,

    CONSTRAINT "MentalWellness_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Symptom" ADD CONSTRAINT "Symptom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentalWellness" ADD CONSTRAINT "MentalWellness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
