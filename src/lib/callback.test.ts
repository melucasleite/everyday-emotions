import { getOrCreateCurrentUser } from "@/lib/getOrCreateCurrentUser";
import { submitSurveyResponse } from "@/lib/survey";
import { callback } from "@/lib/callback";
import { Answer } from "@prisma/client";

jest.mock("@/lib/getOrCreateCurrentUser");
jest.mock("@/lib/survey");

describe("callback", () => {
  const mockUser = { id: "123" };
  const mockSurveyId = 1;
  const mockAnswers: Answer[] = [
    {
      id: 1,
      questionId: 1,
      surveyResponseId: 1,
      response: "Yes",
      userId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      questionId: 2,
      surveyResponseId: 1,
      response: "No",
      userId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should get the current user and submit survey response", async () => {
    (getOrCreateCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (submitSurveyResponse as jest.Mock).mockResolvedValue(undefined);

    await callback(mockSurveyId, mockAnswers);

    expect(getOrCreateCurrentUser).toHaveBeenCalled();
    expect(submitSurveyResponse).toHaveBeenCalledWith(
      mockSurveyId,
      mockUser.id,
      mockAnswers
    );
  });

  test("should throw an error if getOrCreateCurrentUser fails", async () => {
    (getOrCreateCurrentUser as jest.Mock).mockRejectedValue(
      new Error("User error")
    );

    await expect(callback(mockSurveyId, mockAnswers)).rejects.toThrow(
      "User error"
    );
  });

  test("should throw an error if submitSurveyResponse fails", async () => {
    (getOrCreateCurrentUser as jest.Mock).mockResolvedValue(mockUser);
    (submitSurveyResponse as jest.Mock).mockRejectedValue(
      new Error("Survey error")
    );

    await expect(callback(mockSurveyId, mockAnswers)).rejects.toThrow(
      "Survey error"
    );
  });
});
