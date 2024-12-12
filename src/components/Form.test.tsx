import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/jest-dom";
import { mockSurvey } from "@/tests/mockSurvey";

describe("Form", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it("renders the form with all questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);
    expect(screen.getByLabelText("What is your name?")).toBeInTheDocument();
    expect(screen.getByLabelText("Rate our service")).toBeInTheDocument();
    expect(screen.getByLabelText("Red")).toBeInTheDocument();
    expect(screen.getByLabelText("Blue")).toBeInTheDocument();
    expect(screen.getByLabelText("Reading")).toBeInTheDocument();
    expect(screen.getByLabelText("Traveling")).toBeInTheDocument();
  });

  it("submits the form with correct answers", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);

    fireEvent.change(screen.getByLabelText("What is your name?"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Rate our service"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByLabelText("Red"));
    fireEvent.click(screen.getByLabelText("Reading"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith(1, 0, [
      { questionId: 1, response: "John Doe" },
      { questionId: 2, response: "4" },
      { questionId: 3, response: "Red" },
      { questionId: 4, response: "Reading" },
      { questionId: 5, response: "5" },
    ]);
  });

  it("submits the form with empty answers if no input is provided", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith(1, 0, [
      { questionId: 1, response: "" },
      { questionId: 2, response: "3" },
      { questionId: 3, response: "" },
      { questionId: 4, response: "" },
      { questionId: 5, response: "5" },
    ]);
  });

  it("renders a text input for text questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);
    expect(screen.getByLabelText("What is your name?")).toBeInTheDocument();
  });

  it("renders radio buttons for radio questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);
    expect(screen.getByLabelText("Red")).toBeInTheDocument();
    expect(screen.getByLabelText("Blue")).toBeInTheDocument();
  });

  it("renders checkboxes for checkbox questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);
    expect(screen.getByLabelText("Reading")).toBeInTheDocument();
    expect(screen.getByLabelText("Traveling")).toBeInTheDocument();
  });

  it("renders a range input for grade questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);
    expect(screen.getByLabelText("Rate our service")).toBeInTheDocument();
  });

  it("calls the callback with correct answers for text, radio, and checkbox questions", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);

    fireEvent.change(screen.getByLabelText("What is your name?"), {
      target: { value: "John Doe" },
    });
    fireEvent.click(screen.getByLabelText("Red"));
    fireEvent.click(screen.getByLabelText("Reading"));

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith(1, 0, [
      { questionId: 1, response: "John Doe" },
      { questionId: 2, response: "3" },
      { questionId: 3, response: "Red" },
      { questionId: 4, response: "Reading" },
      { questionId: 5, response: "5" },
    ]);
  });

  it("calls the callback with empty answers if no input is provided", () => {
    render(<Form survey={mockSurvey} callback={mockCallback} userId={0} />);

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(mockCallback).toHaveBeenCalledWith(1, 0, [
      { questionId: 1, response: "" },
      { questionId: 2, response: "3" },
      { questionId: 3, response: "" },
      { questionId: 4, response: "" },
      { questionId: 5, response: "5" },
    ]);
  });
});
