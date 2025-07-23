"use client";

import { useState } from "react";

interface MultipleChoiceOption {
  readonly text: string;
  readonly isCorrect: boolean;
}

interface MultipleChoiceQuizProps {
  readonly question: string;
  readonly options: readonly MultipleChoiceOption[];
  readonly onAnswer?: (isCorrect: boolean) => void;
}

export default function MultipleChoiceQuiz({
  question,
  options,
  onAnswer,
}: MultipleChoiceQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);
    const isCorrect = options[optionIndex]?.isCorrect || false;
    onAnswer?.(isCorrect);
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300";
    }

    if (selectedOption === index) {
      return options[index]?.isCorrect
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-red-100 text-red-800 border-red-300";
    }

    if (options[index]?.isCorrect) {
      return "bg-green-100 text-green-800 border-green-300";
    }

    return "bg-gray-100 text-gray-500 border-gray-300";
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
      <div className="text-center mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {options.map((option, index) => (
          <button
            key={`option-${option.text}-${index}`}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${getOptionClass(index)}`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="text-center">
          <p
            className={`text-lg font-medium mb-4 ${
              selectedOption !== null && options[selectedOption]?.isCorrect
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedOption !== null && options[selectedOption]?.isCorrect
              ? "Correct!"
              : "Incorrect!"}
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
