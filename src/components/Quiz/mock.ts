import { QuizProps } from "./types";

export const quizMockData: QuizProps = {
  name: "Software",
  questions: [
    {
      id: 1,
      type: "one-choice",
      title: "Programming Language Part",
      question: "Which programming language is shown in the image?",
      description: "Select the correct answer.",
      options: [
        { text: "Python", value: "python", nextQuestionId: 2 },
        { text: "JavaScript", value: "javascript", nextQuestionId: 3 },
        { text: "Java", value: "java", nextQuestionId: 2 },
        { text: "C++", value: "cpp", nextQuestionId: 2 },
      ],
      image: "js-icon.png",
      answer: "javascript",
    },
  ],
  triggerFadeIn: jest.fn(),
  triggerFadeOut: jest.fn(),
};
