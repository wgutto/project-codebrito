/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "registrations_studentId_courseId_key" ON "registrations"("studentId", "courseId");
