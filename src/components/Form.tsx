"use client";

import { Answer, Prisma } from "@prisma/client";
import { Question } from "./Question";
import { processForm } from "@/lib/utils";

type FullSurvey = Prisma.SurveyGetPayload<{
  include: { questions: { include: { options: true } } };
}>;

export default function Form({
  survey,
  userId,
  callback,
}: {
  survey: FullSurvey;
  userId: number;
  callback: (surveyId: number, userId: number, answers: Answer[]) => void;
}) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const answers = processForm(survey, formData);
    callback(
      survey.id,
      userId,
      answers.map((answer) => answer as Answer)
    );
    event.preventDefault();
  };
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <h1>{survey.name}</h1>
      <form onSubmit={onSubmit} className="text-center" role="form">
        {survey.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
        <button className="bg-white text-black px-3 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
