import React, { useState, ChangeEvent } from "react";
import { QuestionProps } from "./types";
import "./style.scss";

const Question: React.FC<QuestionProps> = ({
  id,
  type,
  title,
  question,
  description,
  options,
  image,
  onAnswer,
}) => {
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<string>("");
  const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<string[]>(
    []
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const optionValue: string = e.target.value.toLowerCase();

    const activeOptions: string[] = e.target.checked
      ? [...multipleChoiceAnswer, optionValue]
      : multipleChoiceAnswer.filter((value) => value !== optionValue);

    setMultipleChoiceAnswer(activeOptions);
  };

  return (
    <div className="Question">
      {title && <h2 className="sub-title">{title}</h2>}
      {question && <h2 className="sub-title">{question}</h2>}
      {image && (
        <img
          className="thumbnail"
          src={require(`../../img/${image}`)}
          alt={title}
        />
      )}
      {description && <p className="description">{description}</p>}

      {options && type === "one-choice" && (
        <div className="Question__one-choice">
          {options.map((option) => (
            <button key={option.value} onClick={() => onAnswer(option.text)}>
              {option.text}
            </button>
          ))}
        </div>
      )}

      {options && type === "multiple-choice" && (
        <div className="Question__multiple-choice">
          {options.map((option) => (
            <div key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                onChange={handleCheckboxChange}
              />
              <label>{option.text}</label>
            </div>
          ))}
          <button onClick={() => onAnswer(multipleChoiceAnswer)}>Submit</button>
        </div>
      )}

      {type === "input" && (
        <div className="Question__input-answer">
          <input
            type="text"
            onBlur={(e) => setSingleChoiceAnswer(e.target.value)}
          />
          <button onClick={() => onAnswer(singleChoiceAnswer)}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Question;
