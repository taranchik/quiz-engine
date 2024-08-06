import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./index";

describe("App", () => {
  test("if it renders title correctly", () => {
    render(<App />);

    const titleElement = screen.getByText("Quiz Engine");

    expect(titleElement).toBeInTheDocument();
  });

  test("if it renders quiz correctly", async () => {
    const expectedQuizName = "Software";

    render(<App />);

    const quizButton = screen.getByText(expectedQuizName);

    fireEvent.click(quizButton);
    const titleElement = await screen.findByText(`${expectedQuizName} Quiz`);

    expect(titleElement).toBeInTheDocument();
  });
});
