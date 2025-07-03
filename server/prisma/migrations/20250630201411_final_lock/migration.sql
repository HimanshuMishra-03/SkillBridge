-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "clientInfo" TEXT,
ADD COLUMN     "companyDescription" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "Freelancer" ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "clientRating" INTEGER,
    "clientReview" TEXT,
    "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "completeAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_applicationId_key" ON "Project"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_jobId_key" ON "Project"("jobId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
