// src/components/ProgressBar.tsx
import React from "react";
import { ProgressBarProps } from "./types";
import "./style.scss";

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="Progress-bar">
      {progress ? (
        <div className="Progress-bar__fill" style={{ width: `${progress}%` }}>
          {Math.round(progress)} %
        </div>
      ) : (
        <div className="Progress-bar__empty">0 %</div>
      )}
    </div>
  );
};

export default ProgressBar;
