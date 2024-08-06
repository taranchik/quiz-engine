import { Question } from "../Question/types";

export const getAnswerScore = (
  choice: Question["answer"],
  answer: Question["answer"]
): number => {
  let score: number = 0;

  if (Array.isArray(choice) && Array.isArray(answer)) {
    // Convert answer to a Set for faster lookups
    const answerSet: Set<string> = new Set(answer);

    // Find common elements (correct choices made by the user)
    const correctSelections: string[] = choice.filter((selection) =>
      answerSet.has(selection)
    );

    // Calculate the number of correct answers missed
    const missedCorrectAnswers: number =
      answer.length - correctSelections.length;

    // Calculate the number of wrong selections (choices that were selected but not correct)
    const wrongSelections: number = choice.length - correctSelections.length;

    // Calculate the score
    if (wrongSelections > 0 || missedCorrectAnswers > 0) {
      // Case when there are wrong selections or missed correct answers
      score = (correctSelections.length - wrongSelections) / answer.length;

      // Ensure score is not negative
      score = Math.max(score, 0);
    } else {
      // Case when all checkboxes were selected properly
      score = 1;
    }
  } else if (
    typeof choice === "string" &&
    typeof answer === "string" &&
    choice.toLowerCase() === answer.toLowerCase()
  ) {
    score = 1;
  }

  return score;
};
