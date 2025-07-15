"use client";

import { useState } from "react";

interface TrueFalseQuizProps {
  readonly question: string;
  readonly correctAnswer: boolean;
  readonly onAnswer?: (isCorrect: boolean) => void;
}

export default function TrueFalseQuiz({
  question,
  correctAnswer,
  onAnswer,
}: TrueFalseQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === correctAnswer;
    onAnswer?.(isCorrect);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getTrueButtonClass = () => {
    if (selectedAnswer === true) {
      return correctAnswer === true ? "bg-green-500" : "bg-red-500";
    }
    return "bg-gray-400";
  };

  const getFalseButtonClass = () => {
    if (selectedAnswer === false) {
      return correctAnswer === false ? "bg-green-500" : "bg-red-500";
    }
    return "bg-gray-400";
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleAnswer(true)}
          disabled={showResult}
          className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
            showResult ? getTrueButtonClass() : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          TRUE
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={showResult}
          className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
            showResult ? getFalseButtonClass() : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          FALSE
        </button>
      </div>

      {showResult && (
        <div className="text-center">
          <p
            className={`text-lg font-medium mb-4 ${
              selectedAnswer === correctAnswer
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
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
