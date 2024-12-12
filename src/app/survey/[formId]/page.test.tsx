import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { getSurveyById, submitSurveyResponse } from "@/lib/survey";
import Page from "./page";
jest.mock("@/lib/survey");
import "@testing-library/jest-dom";
import { getOrCreateCurrentUser } from "@/lib/users";
jest.mock("@/lib/users");

describe("Survey Page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    const mockedGetSurveyById = getSurveyById as jest.MockedFunction<
      typeof getSurveyById
    >;
    mockedGetSurveyById.mockResolvedValue({
      id: 1,
      name: "Sample Survey",
      questions: [],
    });
    const mockedGetOrCreateCurrentUser =
      getOrCreateCurrentUser as jest.MockedFunction<
        typeof getOrCreateCurrentUser
      >;
    mockedGetOrCreateCurrentUser.mockResolvedValue({
      id: 0,
      ssoId: "",
      name: "John Doe",
      email: "john@example.com",
    });
  });

  it("throws an error if formId is not provided", async () => {
    await expect(
      Page({ params: Promise.resolve({ formId: "" }) })
    ).rejects.toThrow("Form ID is required");
  });

  it("renders the Form component with survey data", async () => {
    const params = Promise.resolve({ formId: "1" });
    render(await Page({ params }));
    expect(screen.getByText("Sample Survey")).toBeInTheDocument();
  });

  it("calls submitSurveyResponse when the form is submitted", async () => {
    const params = { formId: "1" };
    const mockedSubmitSurveyResponse =
      submitSurveyResponse as jest.MockedFunction<typeof submitSurveyResponse>;
    render(await Page({ params: Promise.resolve(params) }));
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockedSubmitSurveyResponse).toHaveBeenCalled();
    });
  });
});
