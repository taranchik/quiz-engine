import { Question, Option } from "./types";

export const getOptionNextQuestionId = (
  options: Question["options"],
  answer: Question["answer"]
): Question["nextQuestionId"] | Option["nextQuestionId"] => {
  let option: Option | undefined;

  if (options && typeof answer === "string") {
    option = options.find(
      (option: Option) => option.value.toLowerCase() === answer.toLowerCase()
    );
  }

  return option && option.nextQuestionId;
};
