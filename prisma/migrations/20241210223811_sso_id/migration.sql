/*
  Warnings:

  - A unique constraint covering the columns `[ssoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_ssoId_key" ON "User"("ssoId");
