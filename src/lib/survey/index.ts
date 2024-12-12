import prisma from "../prisma";

export async function getFirstSurvey() {
  const found = await prisma.survey.findFirst({
    include: { questions: { include: { options: true } } },
  });
  if (!found) {
    throw new Error("No survey found");
  }
  return found;
}

export const surveys = [await getFirstSurvey()];
