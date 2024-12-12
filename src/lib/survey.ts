import { Answer } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getFirstSurvey() {
  const found = await prisma.survey.findFirst({
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
