"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  HelpCircle,
  Clock,
  Target,
} from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz: Quiz | null;
}

interface Course {
  id: number;
  title: string;
  description: string;
  chapters: Chapter[];
  finalTest?: Quiz;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  materials: Material[];
  completed: boolean;
}

interface Material {
  id: number;
  name: string;
  type: "pdf" | "doc" | "video" | "image" | "link";
  url: string;
  size?: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "toggle";
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

interface QuizManagerProps {
  chapter?: Chapter | null;
  onUpdateChapter?: (chapter: Chapter) => void;
  type: "chapter" | "final";
  course?: Course;
  onUpdateCourse?: (course: Course) => void;
}

const QuizManager: React.FC<QuizManagerProps> = ({
  chapter,
  onUpdateChapter,
  type,
  course,
  onUpdateCourse,
}) => {
  const currentQuiz = type === "chapter" ? chapter?.quiz : course?.finalTest;

  const [quiz, setQuiz] = useState<Quiz | null>(currentQuiz || null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "multiple-choice" as "multiple-choice" | "true-false" | "toggle",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
  });

  const [quizSettings, setQuizSettings] = useState({
    title:
      quiz?.title ||
      (type === "chapter" ? `${chapter?.title} Quiz` : "Final Course Test"),
    description: quiz?.description || "",
    passingScore: quiz?.passingScore || 70,
    timeLimit: quiz?.timeLimit || 30,
    hasTimeLimit: Boolean(quiz?.timeLimit),
  });

  const handleCreateQuiz = () => {
    const newQuiz: Quiz = {
      id: Math.max(...(quiz ? [quiz.id] : []), 0) + 1,
      title: quizSettings.title,
      description: quizSettings.description,
      questions: [],
      passingScore: quizSettings.passingScore,
      timeLimit: quizSettings.hasTimeLimit ? quizSettings.timeLimit : undefined,
    };

    setQuiz(newQuiz);
    updateQuiz(newQuiz);
  };

  const handleUpdateQuiz = () => {
    if (quiz) {
      const updatedQuiz = {
        ...quiz,
        title: quizSettings.title,
        description: quizSettings.description,
        passingScore: quizSettings.passingScore,
        timeLimit: quizSettings.hasTimeLimit
          ? quizSettings.timeLimit
          : undefined,
      };

      setQuiz(updatedQuiz);
      updateQuiz(updatedQuiz);
      setIsEditing(false);
    }
  };

  const handleAddQuestion = () => {
    if (quiz && newQuestion.question.trim()) {
      let correctAnswer: string | string[];

      if (newQuestion.type === "multiple-choice") {
        correctAnswer = newQuestion.correctAnswer;
      } else if (newQuestion.type === "true-false") {
        correctAnswer = newQuestion.correctAnswer;
      } else {
        // toggle
        correctAnswer = newQuestion.options.filter((option, index) =>
          newQuestion.correctAnswer.includes(index.toString())
        );
      }

      const question: QuizQuestion = {
        id: Math.max(...quiz.questions.map((q) => q.id), 0) + 1,
        question: newQuestion.question,
        type: newQuestion.type,
        options:
          newQuestion.type !== "true-false"
            ? newQuestion.options.filter((opt) => opt.trim())
            : undefined,
        correctAnswer,
        explanation: newQuestion.explanation,
      };

      const updatedQuiz = {
        ...quiz,
        questions: [...quiz.questions, question],
      };

      setQuiz(updatedQuiz);
      updateQuiz(updatedQuiz);
      setNewQuestion({
        question: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      });
      setIsAddingQuestion(false);
    }
  };

  const handleUpdateQuestion = (updatedQuestion: QuizQuestion) => {
    if (quiz) {
      const updatedQuiz = {
        ...quiz,
        questions: quiz.questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        ),
      };

      setQuiz(updatedQuiz);
      updateQuiz(updatedQuiz);
      setSelectedQuestion(updatedQuestion);
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (quiz && confirm("Are you sure you want to delete this question?")) {
      const updatedQuiz = {
        ...quiz,
        questions: quiz.questions.filter((q) => q.id !== questionId),
      };

      setQuiz(updatedQuiz);
      updateQuiz(updatedQuiz);
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(null);
      }
    }
  };

  const handleDeleteQuiz = () => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      setQuiz(null);
      updateQuiz(null);
    }
  };

  const updateQuiz = (updatedQuiz: Quiz | null) => {
    if (type === "chapter" && chapter && onUpdateChapter) {
      onUpdateChapter({
        ...chapter,
        quiz: updatedQuiz,
      });
    } else if (type === "final" && course && onUpdateCourse) {
      onUpdateCourse({
        ...course,
        finalTest: updatedQuiz || undefined,
      });
    }
  };

  const renderQuestionPreview = (question: QuizQuestion) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`preview-${question.id}`}
                  disabled
                  checked={option === question.correctAnswer}
                />
                <span
                  className={
                    option === question.correctAnswer
                      ? "font-medium text-green-600"
                      : ""
                  }
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        );
      case "true-false":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  disabled
                  checked={question.correctAnswer === "true"}
                />
                <span
                  className={
                    question.correctAnswer === "true"
                      ? "font-medium text-green-600"
                      : ""
                  }
                >
                  True
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  disabled
                  checked={question.correctAnswer === "false"}
                />
                <span
                  className={
                    question.correctAnswer === "false"
                      ? "font-medium text-green-600"
                      : ""
                  }
                >
                  False
                </span>
              </label>
            </div>
          </div>
        );
      case "toggle":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  disabled
                  checked={
                    Array.isArray(question.correctAnswer) &&
                    question.correctAnswer.includes(option)
                  }
                />
                <span
                  className={
                    Array.isArray(question.correctAnswer) &&
                    question.correctAnswer.includes(option)
                      ? "font-medium text-green-600"
                      : ""
                  }
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              {type === "chapter"
                ? `${chapter?.title} Quiz`
                : "Final Course Test"}
            </div>
            {quiz && (
              <Button
                variant="outline"
                onClick={handleDeleteQuiz}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Quiz
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            {type === "chapter"
              ? "Create a quiz to test students at the end of this chapter"
              : "Create a comprehensive test covering the entire course"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quiz ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {quiz.questions.length}
                </div>
                <div className="text-sm text-blue-600">Questions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {quiz.passingScore}%
                </div>
                <div className="text-sm text-green-600">Passing Score</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {quiz.timeLimit || "No limit"}
                </div>
                <div className="text-sm text-purple-600">
                  {quiz.timeLimit ? "Minutes" : "Time Limit"}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {quiz.questions.length > 0 ? "Ready" : "Draft"}
                </div>
                <div className="text-sm text-orange-600">Status</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">
                No quiz created yet for this{" "}
                {type === "chapter" ? "chapter" : "course"}
              </p>
              <Button onClick={handleCreateQuiz}>
                <Plus className="w-4 h-4 mr-2" />
                Create Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {quiz && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quiz Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Quiz Settings
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quiz-title">Quiz Title</Label>
                    <Input
                      id="quiz-title"
                      value={quizSettings.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuizSettings((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiz-description">Description</Label>
                    <Textarea
                      id="quiz-description"
                      value={quizSettings.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setQuizSettings((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passing-score">Passing Score (%)</Label>
                    <Input
                      id="passing-score"
                      type="number"
                      min="0"
                      max="100"
                      value={quizSettings.passingScore}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuizSettings((prev) => ({
                          ...prev,
                          passingScore: parseInt(e.target.value) || 70,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="time-limit"
                      checked={quizSettings.hasTimeLimit}
                      onCheckedChange={(checked: boolean) =>
                        setQuizSettings((prev) => ({
                          ...prev,
                          hasTimeLimit: checked,
                        }))
                      }
                    />
                    <Label htmlFor="time-limit">Enable time limit</Label>
                  </div>
                  {quizSettings.hasTimeLimit && (
                    <div>
                      <Label htmlFor="time-limit-value">
                        Time Limit (minutes)
                      </Label>
                      <Input
                        id="time-limit-value"
                        type="number"
                        min="1"
                        value={quizSettings.timeLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuizSettings((prev) => ({
                            ...prev,
                            timeLimit: parseInt(e.target.value) || 30,
                          }))
                        }
                      />
                    </div>
                  )}
                  <Button onClick={handleUpdateQuiz} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{quiz.title}</h4>
                    {quiz.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {quiz.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {quiz.passingScore}% to pass
                    </div>
                    {quiz.timeLimit && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {quiz.timeLimit} minutes
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Questions Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Quiz Questions
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingQuestion(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAddingQuestion && (
                <div className="border rounded-lg p-4 mb-4 space-y-3">
                  <h4 className="font-semibold">Add New Question</h4>
                  <Textarea
                    placeholder="Enter your question"
                    value={newQuestion.question}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    rows={2}
                  />
                  <div>
                    <Label>Question Type</Label>
                    <select
                      value={newQuestion.type}
                      onChange={(e) =>
                        setNewQuestion((prev) => ({
                          ...prev,
                          type: e.target.value as any,
                          options:
                            e.target.value === "true-false"
                              ? []
                              : ["", "", "", ""],
                          correctAnswer: "",
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">True/False</option>
                      <option value="toggle">Multiple Select</option>
                    </select>
                  </div>

                  {newQuestion.type === "multiple-choice" && (
                    <div className="space-y-2">
                      <Label>Answer Options</Label>
                      {newQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const newOptions = [...newQuestion.options];
                              newOptions[index] = e.target.value;
                              setNewQuestion((prev) => ({
                                ...prev,
                                options: newOptions,
                              }));
                            }}
                          />
                          <input
                            type="radio"
                            name="correct-answer"
                            checked={newQuestion.correctAnswer === option}
                            onChange={() =>
                              setNewQuestion((prev) => ({
                                ...prev,
                                correctAnswer: option,
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {newQuestion.type === "true-false" && (
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tf-answer"
                            checked={newQuestion.correctAnswer === "true"}
                            onChange={() =>
                              setNewQuestion((prev) => ({
                                ...prev,
                                correctAnswer: "true",
                              }))
                            }
                          />
                          <span>True</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tf-answer"
                            checked={newQuestion.correctAnswer === "false"}
                            onChange={() =>
                              setNewQuestion((prev) => ({
                                ...prev,
                                correctAnswer: "false",
                              }))
                            }
                          />
                          <span>False</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {newQuestion.type === "toggle" && (
                    <div className="space-y-2">
                      <Label>Answer Options (select correct ones)</Label>
                      {newQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const newOptions = [...newQuestion.options];
                              newOptions[index] = e.target.value;
                              setNewQuestion((prev) => ({
                                ...prev,
                                options: newOptions,
                              }));
                            }}
                          />
                          <input
                            type="checkbox"
                            checked={newQuestion.correctAnswer.includes(
                              index.toString()
                            )}
                            onChange={(e) => {
                              const indexStr = index.toString();
                              const currentAnswers = newQuestion.correctAnswer
                                .split(",")
                                .filter((a) => a);
                              if (e.target.checked) {
                                setNewQuestion((prev) => ({
                                  ...prev,
                                  correctAnswer: [
                                    ...currentAnswers,
                                    indexStr,
                                  ].join(","),
                                }));
                              } else {
                                setNewQuestion((prev) => ({
                                  ...prev,
                                  correctAnswer: currentAnswers
                                    .filter((a) => a !== indexStr)
                                    .join(","),
                                }));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label>Explanation (optional)</Label>
                    <Textarea
                      placeholder="Explain why this is the correct answer"
                      value={newQuestion.explanation}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setNewQuestion((prev) => ({
                          ...prev,
                          explanation: e.target.value,
                        }))
                      }
                      rows={2}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.question.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingQuestion(false);
                        setNewQuestion({
                          question: "",
                          type: "multiple-choice",
                          options: ["", "", "", ""],
                          correctAnswer: "",
                          explanation: "",
                        });
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <Badge variant="secondary">{question.type}</Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedQuestion(question)}
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      {renderQuestionPreview(question)}
                    </div>
                    {question.explanation && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {quiz.questions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No questions added yet</p>
                    <p className="text-xs">
                      Click "Add Question" to get started
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizManager;
