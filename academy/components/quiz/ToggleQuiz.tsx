"use client";

import { useState } from "react";

interface ToggleQuizOption {
  readonly text: string;
  readonly correctValue: boolean;
}

interface ToggleQuizProps {
  readonly question: string;
  readonly options: readonly ToggleQuizOption[];
  readonly onAnswer?: (isCorrect: boolean) => void;
}

export default function ToggleQuiz({
  question,
  options,
  onAnswer,
}: ToggleQuizProps) {
  const [toggleStates, setToggleStates] = useState<boolean[]>(
    new Array(options.length).fill(false)
  );
  const [showResult, setShowResult] = useState(false);

  const handleToggle = (index: number) => {
    if (showResult) return;

    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  const handleSubmit = () => {
    setShowResult(true);
    const isCorrect = toggleStates.every(
      (state, index) => state === options[index]?.correctValue
    );
    onAnswer?.(isCorrect);
  };

  const resetQuiz = () => {
    setToggleStates(new Array(options.length).fill(false));
    setShowResult(false);
  };

  const getToggleClass = (index: number) => {
    if (!showResult) {
      return toggleStates[index] ? "bg-teal-500" : "bg-gray-300";
    }

    const isCorrect = toggleStates[index] === options[index]?.correctValue;
    return isCorrect ? "bg-green-500" : "bg-red-500";
  };

  const isAllCorrect =
    showResult &&
    toggleStates.every(
      (state, index) => state === options[index]?.correctValue
    );

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
      <div className="text-center mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
      </div>

      <div className="space-y-4 mb-8">
        {options.map((option, index) => (
          <div
            key={`toggle-${option.text}-${index}`}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
          >
            <span className="text-gray-800">{option.text}</span>
            <button
              onClick={() => handleToggle(index)}
              disabled={showResult}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${getToggleClass(index)}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  toggleStates[index] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {!showResult ? (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p
            className={`text-lg font-medium mb-4 ${
              isAllCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAllCorrect ? "Correct!" : "Incorrect!"}
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
