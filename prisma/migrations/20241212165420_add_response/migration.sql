/*
  Warnings:

  - You are about to drop the `_AnswerToSurveyResponse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `surveyResponseId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AnswerToSurveyResponse" DROP CONSTRAINT "_AnswerToSurveyResponse_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerToSurveyResponse" DROP CONSTRAINT "_AnswerToSurveyResponse_B_fkey";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "surveyResponseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AnswerToSurveyResponse";

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES "SurveyResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
