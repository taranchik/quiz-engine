import { Question } from "../Question/types";

export interface QuizProps extends Quiz {
  triggerFadeIn: () => void;
  triggerFadeOut: () => void;
}

export interface Quiz {
  name: string;
  questions: Question[];
}
