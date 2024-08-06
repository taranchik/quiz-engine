import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./index";
import { QuestionProps } from "./types";
import { questionMockData } from "./mock";

describe("Question", () => {
  test("renders title, question, image and description", () => {
    render(<Question {...questionMockData} />);

    expect(screen.getByText(questionMockData?.title ?? "")).toBeInTheDocument();
    expect(screen.getByText(questionMockData.question)).toBeInTheDocument();
    expect(
      screen.getByText(questionMockData?.description ?? "")
    ).toBeInTheDocument();
  });

  test("renders multiple choice options and handles checkbox change", () => {
    render(<Question {...questionMockData} />);

    const optionValue = questionMockData.options?.[0]?.value ?? "";
    const checkbox = screen.getByDisplayValue(optionValue);

    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText("Submit"));

    expect(questionMockData.onAnswer).toHaveBeenCalledWith([optionValue]);
  });

  test("renders single choice options and handles button click", () => {
    const props: QuestionProps = {
      ...questionMockData,
      type: "one-choice",
    };

    render(<Question {...props} />);

    const optionText = questionMockData.options?.[0]?.text ?? "";
    const option = screen.getByText(optionText);

    expect(option).toBeInTheDocument();

    fireEvent.click(option);
    expect(props.onAnswer).toHaveBeenCalledWith(optionText);
  });

  test("renders input type and handles input change", () => {
    const props: QuestionProps = {
      ...questionMockData,
      type: "input",
      options: undefined,
    };

    render(<Question {...props} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    fireEvent.blur(input, { target: { value: "input answer" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(props.onAnswer).toHaveBeenCalledWith("input answer");
  });
});
