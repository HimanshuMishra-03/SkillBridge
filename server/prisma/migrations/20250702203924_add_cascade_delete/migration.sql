-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_jobId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
