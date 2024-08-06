import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./index";
import { ProgressBarProps } from "./types";

export const progressBarMockData: ProgressBarProps = {
  current: 0,
  total: 4,
};

describe("Progress Bar", () => {
  test("if it renders bar load correctly", () => {
    render(<ProgressBar {...progressBarMockData} />);

    const barElement = screen.getByText("0 %");

    expect(barElement).toBeInTheDocument();
  });

  test("if it changes bar load correctly", async () => {
    render(<ProgressBar {...progressBarMockData} current={2} />);

    const barElement = screen.getByText("50 %");

    expect(barElement).toBeInTheDocument();
  });
});
