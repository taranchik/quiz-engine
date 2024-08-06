import React, { useState, useEffect } from "react";
import Question from "../Question";
import { Question as QuizQuestion, Option } from "../Question/types";
import { QuizProps } from "./types";
import ProgressBar from "../ProgressBar";
import { getOptionNextQuestionId } from "../Question/utils";
import { getAnswerScore } from "./utils";

const Quiz: React.FC<QuizProps> = ({
  name,
  questions,
  triggerFadeOut,
  triggerFadeIn,
}) => {
  const [answerScore, setAnswerScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Make sure to apply fade in animation exactly after currentQuestionIndex update
  useEffect(
    () => triggerFadeIn(),
    [triggerFadeIn, currentQuestionIndex, isCompleted]
  );

  const nextQuestion = (
    nextQuestionId: QuizQuestion["nextQuestionId"] | Option["nextQuestionId"]
  ) => {
    const nextQuestionIndex: number = questions.findIndex(
      (question) => question.id === nextQuestionId
    );

    if (nextQuestionIndex > 0) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsCompleted(true);
    }
  };

  const handleAnswer = (choice: QuizQuestion["answer"]) => {
    if (choice === "" || (Array.isArray(choice) && choice.length === 0)) {
      alert("Kindly, provide an answer.");

      return;
    }

    triggerFadeOut();

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswerScore: number = getAnswerScore(
      choice,
      currentQuestion.answer
    );

    setAnswerScore(answerScore + currentAnswerScore);
    setTotalQuestions(totalQuestions + 1);

    const nextQuestionId:
      | QuizQuestion["nextQuestionId"]
      | Option["nextQuestionId"] =
      currentQuestion.nextQuestionId ||
      getOptionNextQuestionId(currentQuestion.options, choice);

    // Match duration 0.5s of fadeOut
    setTimeout(() => nextQuestion(nextQuestionId), 500);
  };

  return (
    <div className="Quiz">
      <h1 className="title">{name} Quiz</h1>
      <ProgressBar
        current={isCompleted ? currentQuestionIndex + 1 : currentQuestionIndex}
        total={questions.length}
      />
      {isCompleted ? (
        <div>
          Quiz Completed.{" "}
          <b>
            Your score is {answerScore}/{totalQuestions}
          </b>
        </div>
      ) : (
        <Question
          {...questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;
