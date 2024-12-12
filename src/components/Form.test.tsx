import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/jest-dom";
import { Prisma } from "@prisma/client";

type FullSurvey = Prisma.SurveyGetPayload<{
  include: { questions: { include: { options: true } } };
}>;

const mockSurvey: FullSurvey = {
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

describe("Form", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it("renders the form with all questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} />);
    expect(screen.getByLabelText("What is your name?")).toBeInTheDocument();
    expect(screen.getByLabelText("Rate our service")).toBeInTheDocument();
    expect(screen.getByLabelText("Red")).toBeInTheDocument();
    expect(screen.getByLabelText("Blue")).toBeInTheDocument();
    expect(screen.getByLabelText("Reading")).toBeInTheDocument();
    expect(screen.getByLabelText("Traveling")).toBeInTheDocument();
  });

  it("submits the form with correct answers", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} />);

    fireEvent.change(screen.getByLabelText("What is your name?"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Rate our service"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByLabelText("Red"));
    fireEvent.click(screen.getByLabelText("Reading"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith([
      { questionId: 1, value: "John Doe" },
      { questionId: 2, value: "4" },
      { questionId: 3, value: "1" },
      { questionId: 4, value: "1" },
      { questionId: 5, value: "5" },
    ]);
  });

  it("submits the form with empty answers if no input is provided", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} />);

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith([
      { questionId: 1, value: "" },
      { questionId: 2, value: "3" },
      { questionId: 3, value: "" },
      { questionId: 4, value: "" },
      { questionId: 5, value: "5" },
    ]);
  });
});
