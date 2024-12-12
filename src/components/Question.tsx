import { Prisma } from "@prisma/client";
import { Options } from "./Options";

type QuestionWithOptions = Prisma.QuestionGetPayload<{
  include: { options: true };
}>;

export const Question = ({ question }: { question: QuestionWithOptions }) => (
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
      ) : question.type === "radio" ? (
        <Options
          questionId={question.id}
          options={question.options}
          type="radio"
        />
      ) : question.type === "checkbox" ? (
        <Options
          questionId={question.id}
          options={question.options}
          type="checkbox"
        />
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
);
