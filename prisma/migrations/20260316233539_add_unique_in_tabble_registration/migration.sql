/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "registrations_studentId_key" ON "registrations"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_courseId_key" ON "registrations"("courseId");
