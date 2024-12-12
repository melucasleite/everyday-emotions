"use server";

import { getOrCreateCurrentUser } from "@/lib/getOrCreateCurrentUser";
import { submitSurveyResponse } from "@/lib/survey";
import { Answer } from "@prisma/client";

export const callback = async (surveyId: number, answers: Answer[]) => {
  const currentUser = await getOrCreateCurrentUser();
  await submitSurveyResponse(surveyId, currentUser.id, answers);
};
