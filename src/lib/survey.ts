import { Answer } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getSurveyById(surveyId: number) {
  const found = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: { questions: { include: { options: true } } },
  });
  if (!found) {
    throw new Error("No survey found");
  }
  return found;
}

export async function submitSurveyResponse(
  surveyId: number,
  userId: number,
  answers: Answer[]
) {
  await prisma.surveyResponse.create({
    data: {
      surveyId,
      userId,
      answers: {
        create: answers.map((answer) => ({
          response: answer.response,
          questionId: answer.questionId,
          userId,
        })),
      },
    },
  });

  return "Survey response submitted";
}
