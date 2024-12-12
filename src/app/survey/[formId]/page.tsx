import Form from "@/components/Form";
import { getSurveyById, submitSurveyResponse } from "@/lib/survey";
import { getOrCreateCurrentUser } from "@/lib/users";
import { Answer } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const formId = (await params).formId;
  if (!formId) {
    throw new Error("Form ID is required");
  }
  const currentUser = await getOrCreateCurrentUser();
  const survey = await getSurveyById(Number(formId));

  const callback = async (
    surveyId: number,
    userId: number,
    answers: Answer[]
  ) => {
    "use server";
    await submitSurveyResponse(surveyId, userId, answers);
  };

  return (
    <>
      <Form survey={survey} callback={callback} userId={currentUser.id} />
    </>
  );
}
