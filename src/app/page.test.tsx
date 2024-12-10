import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders the Next.js logo", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(await Home());
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the users list", async () => {
    const users = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(users));
    render(await Home());
    users.forEach((user) => {
      expect(
        screen.getByText(`${user.name} - ${user.email}`)
      ).toBeInTheDocument();
    });
  });

  it("renders the deploy now link", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(await Home());
    const deployLink = screen.getByText("Deploy now");
    expect(deployLink).toBeInTheDocument();
  });

  it("renders the read our docs link", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(await Home());
    const docsLink = screen.getByText("Read our docs");
    expect(docsLink).toBeInTheDocument();
  });

  it("renders the footer links", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(await Home());
    const learnLink = screen.getByText("Learn");
    const examplesLink = screen.getByText("Examples");
    const nextjsLink = screen.getByText("Go to nextjs.org →");
    expect(learnLink).toBeInTheDocument();
    expect(examplesLink).toBeInTheDocument();
    expect(nextjsLink).toBeInTheDocument();
  });
});
