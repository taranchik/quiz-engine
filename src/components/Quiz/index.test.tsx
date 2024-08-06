// src/components/Quiz/Quiz.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "./index";
import { quizMockData } from "./mock";

describe("Quiz", () => {
  test("renders quiz name, question and load bar", () => {
    render(<Quiz {...quizMockData} />);

    expect(screen.getByText(`${quizMockData.name} Quiz`)).toBeInTheDocument();
    expect(
      screen.getByText(quizMockData.questions[0].question)
    ).toBeInTheDocument();

    const barElement = screen.getByText("0 %");

    expect(barElement).toBeInTheDocument();
  });

  test("triggers fade in and fade out effects", () => {
    render(<Quiz {...quizMockData} />);

    const optionText = quizMockData.questions[0].options?.[0]?.text ?? "";
    const option = screen.getByText(optionText);
    expect(option).toBeInTheDocument();

    fireEvent.click(option);
    expect(quizMockData.triggerFadeIn).toHaveBeenCalled();
    expect(quizMockData.triggerFadeOut).toHaveBeenCalled();
  });
});
