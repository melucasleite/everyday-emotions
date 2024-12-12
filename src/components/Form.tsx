"use client";

import { Answer, Prisma } from "@prisma/client";

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
    const answers = survey.questions.map((question) => {
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
          <div className="mb-5" key={question.id}>
            <div className="mb-5">
              <label htmlFor={`question-${question.id}`}>{question.text}</label>
            </div>
            <div>
              {question.type === "text" ? (
                <input
                  type="text"
                  id={`question-${question.id}`}
                  name={`question-${question.id}`}
                />
              ) : question.type === "radio" && question.options ? (
                question.options.map((option) => (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={`question-${question.id}-option-${option.id}`}
                      name={`question-${question.id}`}
                      value={option.text}
                    />
                    <label
                      htmlFor={`question-${question.id}-option-${option.id}`}
                    >
                      {option.text}
                    </label>
                  </div>
                ))
              ) : question.type === "checkbox" && question.options ? (
                question.options.map((option) => (
                  <div key={option.id}>
                    <input
                      type="checkbox"
                      id={`question-${question.id}-option-${option.id}`}
                      name={`question-${question.id}-option-${option.id}`}
                    />
                    <label
                      htmlFor={`question-${question.id}-option-${option.id}`}
                    >
                      {option.text}
                    </label>
                  </div>
                ))
              ) : (
                <input
                  type="range"
                  id={`question-${question.id}`}
                  name={`question-${question.id}`}
                  min={question.min || 0}
                  max={question.max || 10}
                />
              )}
            </div>
          </div>
        ))}
        <button className="bg-white text-black px-3 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
