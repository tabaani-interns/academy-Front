"use client";

import TrueFalseQuiz from "../../../../components/quiz/TrueFalseQuiz";
import MultipleChoiceQuiz from "../../../../components/quiz/MultipleChoiceQuiz";
import ToggleQuiz from "../../../../components/quiz/ToggleQuiz";

export default function QuizPage() {
  const handleAnswer = (quizType: string) => (isCorrect: boolean) => {
    console.log(`${quizType} Quiz: ${isCorrect ? "Correct" : "Incorrect"}`);
  };

  const handleQuizComplete = (results: boolean[]) => {
    console.log("True/False Quiz Complete:", results);
    const correctCount = results.filter(Boolean).length;
    console.log(`Score: ${correctCount}/${results.length}`);
  };

  // Stack of True/False questions
  const trueFalseQuestions = [
    {
      question:
        "Lorem Ipsum Dolor Sit Amet Consectetur. Odio Auctor Tincidunt Pellentesque Sapien Sed Mauris A. Amet Mauris Tellus Eu Leo Habitant Malesuada Egestas?",
      correctAnswer: false,
    },
    {
      question:
        "Next.js is a React framework that enables server-side rendering and static site generation out of the box?",
      correctAnswer: true,
    },
    {
      question:
        "TypeScript is a superset of JavaScript that adds static type definitions to help catch errors during development?",
      correctAnswer: true,
    },
  ];

  const multipleChoiceOptions = [
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      isCorrect: true,
    },
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      isCorrect: false,
    },
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      isCorrect: false,
    },
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      isCorrect: false,
    },
  ];

  const toggleOptions = [
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      correctValue: true,
    },
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      correctValue: false,
    },
    {
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. A Odio Non Tortor Maecenas Purus Tellus Odio Massa Tincidunt.",
      correctValue: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Components Test
          </h1>
          <p className="text-xl text-gray-600">
            Test all three quiz component types
          </p>
        </div>

        <div className="space-y-16">
          {/* True/False Quiz - Swipeable Stack */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Swipeable True/False Quiz
            </h2>
            <TrueFalseQuiz
              questions={trueFalseQuestions}
              onQuizComplete={handleQuizComplete}
            />
          </div>

          {/* Multiple Choice Quiz */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Multiple Choice Quiz
            </h2>
            <MultipleChoiceQuiz
              question="Lorem Ipsum Dolor Sit Amet Consectetur. Odio Auctor Tincidunt Pellentesque Sapien Sed Mauris A. Amet Mauris Tellus Eu Leo Habitant Malesuada Egestas. Tellus Nibh Sed Eu Lobortis Scelerisque?"
              options={multipleChoiceOptions}
              onAnswer={handleAnswer("Multiple Choice")}
            />
          </div>

          {/* Toggle Quiz */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Toggle Quiz
            </h2>
            <ToggleQuiz
              question="Lorem Ipsum Dolor Sit Amet Consectetur. Odio Auctor Tincidunt Pellentesque Sapien Sed Mauris A. Amet Mauris Tellus Eu Leo Habitant Malesuada Egestas. Tellus Nibh Sed Eu Lobortis Scelerisque?"
              options={toggleOptions}
              onAnswer={handleAnswer("Toggle")}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-16">
          <a
            href="/courses"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            ← Back to Courses
          </a>
        </div>
      </div>
    </div>
  );
}
