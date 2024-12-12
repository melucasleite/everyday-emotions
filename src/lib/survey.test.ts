import prisma from "@/lib/prisma";
import { getSurveyById, submitSurveyResponse } from "./survey";

jest.mock("@/lib/prisma", () => ({
  survey: {
    findUnique: jest.fn(),
  },
  surveyResponse: {
    create: jest.fn(),
  },
}));

describe("getSurveyById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return the first survey if found", async () => {
    const mockSurvey = {
      id: 1,
      title: "Sample Survey",
      questions: [
        {
          id: 1,
          text: "Sample Question",
          options: [{ id: 1, text: "Option 1" }],
        },
      ],
    };

    (prisma.survey.findUnique as jest.Mock).mockResolvedValue(mockSurvey);

    const survey = await getSurveyById(1);

    expect(survey).toEqual(mockSurvey);
    expect(prisma.survey.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { questions: { include: { options: true } } },
    });
  });

  test("should throw an error if no survey is found", async () => {
    (prisma.survey.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(getSurveyById(1)).rejects.toThrow("No survey found");
    expect(prisma.survey.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { questions: { include: { options: true } } },
    });
  });

  test("should throw an error if prisma throws an unknown error", async () => {
    (prisma.survey.findUnique as jest.Mock).mockRejectedValue(
      new Error("Unknown error")
    );

    await expect(getSurveyById(1)).rejects.toThrow("Unknown error");
  });
});

describe("submitSurveyResponse", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should submit survey response successfully", async () => {
    const mockAnswers = [
      {
        id: 1,
        response: "Answer 1",
        questionId: 1,
        userId: 1,
        surveyResponseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        response: "Answer 2",
        questionId: 2,
        userId: 1,
        surveyResponseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (prisma.surveyResponse.create as jest.Mock).mockResolvedValue({
      id: 1,
      surveyId: 1,
      userId: 1,
      answers: mockAnswers,
    });

    const result = await submitSurveyResponse(1, 1, mockAnswers);

    expect(result).toBe("Survey response submitted");
    expect(prisma.surveyResponse.create).toHaveBeenCalledWith({
      data: {
        surveyId: 1,
        userId: 1,
        answers: {
          create: mockAnswers.map((answer) => ({
            response: answer.response,
            questionId: answer.questionId,
            userId: answer.userId,
          })),
        },
      },
    });
  });

  test("should throw an error if prisma throws an unknown error", async () => {
    const mockAnswers = [
      {
        id: 1,
        response: "Answer 1",
        questionId: 1,
        userId: 1,
        surveyResponseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        response: "Answer 2",
        questionId: 2,
        userId: 1,
        surveyResponseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (prisma.surveyResponse.create as jest.Mock).mockRejectedValue(
      new Error("Unknown error")
    );

    await expect(submitSurveyResponse(1, 1, mockAnswers)).rejects.toThrow(
      "Unknown error"
    );
  });
});
