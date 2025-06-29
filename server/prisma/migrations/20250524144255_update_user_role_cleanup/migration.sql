/*
  Warnings:

  - Added the required column `githubId` to the `Freelancer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Freelancer" ADD COLUMN     "githubId" TEXT NOT NULL;
