import { Quiz } from "../components/Quiz/types";
import { QuestionType } from "../components/Question/types";

import software from "./software.json";
import geography from "./geography.json";

// Iterate through questions type assertion to tell the compiler that a value conforms to a QuestionType
function convertQuiz(quiz: any): Quiz {
  return {
    ...quiz,
    questions: quiz.questions.map((question: any) => ({
      ...question,
      type: question.type as QuestionType, // Type assertion to QuestionType
    })),
  };
}

// Paste json data here
const data: any = [software, geography];

// Export all quizzes as an array
const quizzes: Quiz[] = data.map((jsonQuiz: any) => convertQuiz(jsonQuiz));

export default quizzes;
