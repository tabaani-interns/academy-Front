"use client";

import { useState, useRef } from "react";

interface TrueFalseQuestion {
  readonly question: string;
  readonly correctAnswer: boolean;
}

interface TrueFalseQuizProps {
  readonly questions?: readonly TrueFalseQuestion[];
  readonly question?: string;
  readonly correctAnswer?: boolean;
  readonly onAnswer?: (isCorrect: boolean) => void;
  readonly onQuizComplete?: (results: boolean[]) => void;
}

export default function TrueFalseQuiz({
  questions,
  question,
  correctAnswer,
  onAnswer,
  onQuizComplete,
}: TrueFalseQuizProps) {
  // Handle both single question and multiple questions
  const quizQuestions =
    questions ||
    (question && correctAnswer !== undefined
      ? [{ question, correctAnswer }]
      : []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex >= quizQuestions.length;

  const handleSwipe = (answer: boolean) => {
    if (isAnimating || isQuizComplete) return;

    setIsAnimating(true);
    setSwipeDirection(answer ? "right" : "left");

    const isCorrect = answer === currentQuestion.correctAnswer;
    const newResults = [...results, isCorrect];
    setResults(newResults);

    // Call onAnswer for single question compatibility
    onAnswer?.(isCorrect);

    setTimeout(() => {
      if (currentQuestionIndex + 1 >= quizQuestions.length) {
        // Quiz completed
        onQuizComplete?.(newResults);
      } else {
        // Move to next question
        setCurrentQuestionIndex((prev) => prev + 1);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setResults([]);
    setIsAnimating(false);
    setSwipeDirection(null);
  };

  const getCardTransform = (index: number) => {
    const offset = index - currentQuestionIndex;

    if (offset < 0) return "translateX(-100%) scale(0.8)";
    if (offset === 0) {
      if (swipeDirection === "left")
        return "translateX(-120%) rotate(-15deg) scale(0.9)";
      if (swipeDirection === "right")
        return "translateX(120%) rotate(15deg) scale(0.9)";
      return "translateX(0) scale(1)";
    }

    return `translateY(-${offset * 8}px) scale(${1 - offset * 0.05}) translateZ(${-offset * 10}px)`;
  };

  const getCardOpacity = (index: number) => {
    const offset = index - currentQuestionIndex;
    if (offset < 0) return 0;
    if (offset === 0) return swipeDirection ? 0.7 : 1;
    return Math.max(0.3, 1 - offset * 0.2);
  };

  const getCardZIndex = (index: number) => {
    return quizQuestions.length - Math.abs(index - currentQuestionIndex);
  };

  if (isQuizComplete) {
    const correctCount = results.filter(Boolean).length;
    const percentage = Math.round((correctCount / results.length) * 100);

    return (
      <div className="bg-white rounded-2xl p-8 max-w-md mx-auto border border-gray-200 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{percentage}%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h3>
          <p className="text-gray-600">
            You got {correctCount} out of {results.length} questions correct
          </p>
        </div>

        <div className="mb-6">
          {results.map((isCorrect, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700">Question {index + 1}</span>
              <span
                className={`font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}
              >
                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative max-w-md mx-auto h-96">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-center mb-2">
          <span className="text-sm text-gray-600">
            {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Stacked cards */}
      <div className="relative h-80">
        {quizQuestions.map((q, index) => (
          <div
            key={index}
            ref={index === currentQuestionIndex ? cardRef : null}
            className="absolute inset-0 bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-500 ease-out cursor-pointer"
            style={{
              transform: getCardTransform(index),
              opacity: getCardOpacity(index),
              zIndex: getCardZIndex(index),
            }}
          >
            <div className="h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {q.question}
                </p>
              </div>

              {index === currentQuestionIndex && (
                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => handleSwipe(false)}
                    disabled={isAnimating}
                    className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-110 shadow-lg"
                  >
                    ✗
                  </button>
                  <button
                    onClick={() => handleSwipe(true)}
                    disabled={isAnimating}
                    className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 transform hover:scale-110 shadow-lg"
                  >
                    ✓
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">Tap ✓ for True or ✗ for False</p>
      </div>
    </div>
  );
}
