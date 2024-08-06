import React, { useState, useEffect, useCallback } from "react";
import Quiz from "../Quiz";
import "./style.scss";
import { Quiz as QuizData } from "../Quiz/types";
import quizzes from "../../data/quizData";

const App: React.FC = () => {
  const [animation, setAnimation] = useState<string>("fadeIn");
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  const triggerFadeOut = useCallback(
    () => setAnimation("fadeOut"),
    [setAnimation]
  );
  const triggerFadeIn = useCallback(
    () => setAnimation("fadeIn"),
    [setAnimation]
  );

  const handleQuizChange = (quiz: QuizData) => {
    triggerFadeOut();

    // Match duration 0.5s of fadeOut
    setTimeout(() => {
      setQuizData(quiz);
    }, 500);
  };

  // Make sure to apply fade in animation exactly after quizData update
  useEffect(() => {
    triggerFadeIn();
  }, [triggerFadeIn, quizData]);

  return (
    <div className={`App ${animation}`}>
      {quizData ? (
        <Quiz
          {...quizData}
          triggerFadeOut={triggerFadeOut}
          triggerFadeIn={triggerFadeIn}
        />
      ) : (
        <div>
          <h1 className="title">Quiz Engine</h1>
          <p className="description">Choose quiz topic: </p>
          <div className="App__quiz-buttons">
            {quizzes.map((quiz, index) => (
              <button key={index} onClick={() => handleQuizChange(quiz)}>
                {quiz.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
