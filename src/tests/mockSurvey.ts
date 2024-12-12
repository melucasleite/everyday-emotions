import { Prisma } from "@prisma/client";

type FullSurvey = Prisma.SurveyGetPayload<{
  include: { questions: { include: { options: true } } };
}>;

export const mockSurvey: FullSurvey = {
  id: 1,
  name: "Sample Survey",
  questions: [
    {
      id: 1,
      text: "What is your name?",
      type: "text",
      options: [],
      min: null,
      max: null,
      surveyId: 1,
    },
    {
      id: 2,
      text: "Rate our service",
      type: "grade",
      min: 1,
      max: 5,
      options: [],
      surveyId: 1,
    },
    {
      id: 3,
      text: "Choose your favorite color",
      type: "radio",
      options: [
        { id: 1, text: "Red", questionId: 3 },
        { id: 2, text: "Blue", questionId: 3 },
      ],
      min: null,
      max: null,
      surveyId: 1,
    },
    {
      id: 4,
      text: "Select your hobbies",
      type: "checkbox",
      options: [
        { id: 1, text: "Reading", questionId: 4 },
        { id: 2, text: "Traveling", questionId: 4 },
      ],
      min: null,
      max: null,
      surveyId: 1,
    },
    {
      id: 5,
      text: "Rate our service without min max",
      type: "grade",
      min: null,
      max: null,
      options: [],
      surveyId: 1,
    },
  ],
};
