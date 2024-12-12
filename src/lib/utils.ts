import { Prisma } from "@prisma/client";

type FullSurvey = Prisma.SurveyGetPayload<{
  include: { questions: { include: { options: true } } };
}>;

export const processForm = (survey: FullSurvey, formData: FormData) => {
  return survey.questions.map((question) => {
    const name = `question-${question.id}`;
    if (
      question.type === "text" ||
      question.type === "grade" ||
      question.type === "radio"
    ) {
      const value = formData.get(name);
      return {
        questionId: question.id,
        response: value ? value.toString() : "",
      };
    } else {
      const values = question.options
        .filter((option) => formData.get(`${name}-option-${option.id}`))
        .map((option) => option.text.toString());
      return {
        questionId: question.id,
        response: values.join(","),
      };
    }
  });
};
