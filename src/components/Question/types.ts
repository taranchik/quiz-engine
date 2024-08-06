export interface QuestionProps
  extends Omit<Question, "nextQuestionId" | "answer"> {
  onAnswer: (answer: any) => void;
}

export type QuestionType = "one-choice" | "multiple-choice" | "input";

export interface Question {
  id: number;
  type: QuestionType;
  title?: string;
  question: string;
  description?: string;
  options?: Option[];
  image?: string;
  answer: string | string[];
  nextQuestionId?: number;
}

export interface Option {
  text: string;
  value: string;
  nextQuestionId?: number;
}
