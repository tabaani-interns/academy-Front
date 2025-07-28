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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Trash2,
  Play,
  Clock,
  ChevronUp,
  ChevronDown,
  BookOpen,
  HelpCircle as QuizIcon,
} from "lucide-react";
import QuizManager from "./QuizManager";
import LessonManager from "./LessonManager";

interface Course {
  id: number;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz: Quiz | null;
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

interface ChapterManagerProps {
  course: Course;
  onUpdateCourse: (course: Course) => void;
}

const ChapterManager: React.FC<ChapterManagerProps> = ({
  course,
  onUpdateCourse,
}) => {
  const [activeTab, setActiveTab] = useState("chapters");
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [newChapter, setNewChapter] = useState({
    title: "",
    description: "",
  });

  const [chapters, setChapters] = useState<Chapter[]>(
    course.chapters || [
      {
        id: 1,
        title: "Introduction to React",
        description: "Learn the fundamentals of React",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "What is React?",
            description: "Understanding React and its purpose",
            videoUrl: "",
            duration: 15,
            order: 1,
            materials: [],
            completed: false,
          },
        ],
        quiz: null,
      },
    ]
  );

  const handleAddChapter = () => {
    if (newChapter.title.trim()) {
      const chapter: Chapter = {
        id: Math.max(...chapters.map((c) => c.id), 0) + 1,
        title: newChapter.title,
        description: newChapter.description,
        order: chapters.length + 1,
        lessons: [],
        quiz: null,
      };

      const updatedChapters = [...chapters, chapter];
      setChapters(updatedChapters);
      updateCourse(updatedChapters);
      setNewChapter({ title: "", description: "" });
    }
  };

  const handleUpdateChapter = (updatedChapter: Chapter) => {
    const updatedChapters = chapters.map((c) =>
      c.id === updatedChapter.id ? updatedChapter : c
    );
    setChapters(updatedChapters);
    updateCourse(updatedChapters);
    setSelectedChapter(updatedChapter);
  };

  const handleDeleteChapter = (chapterId: number) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      const updatedChapters = chapters
        .filter((c) => c.id !== chapterId)
        .map((c, index) => ({ ...c, order: index + 1 }));
      setChapters(updatedChapters);
      updateCourse(updatedChapters);
      if (selectedChapter?.id === chapterId) {
        setSelectedChapter(null);
      }
    }
  };

  const moveChapter = (chapterId: number, direction: "up" | "down") => {
    const chapterIndex = chapters.findIndex((c) => c.id === chapterId);
    if (
      (direction === "up" && chapterIndex > 0) ||
      (direction === "down" && chapterIndex < chapters.length - 1)
    ) {
      const newChapters = [...chapters];
      const swapIndex =
        direction === "up" ? chapterIndex - 1 : chapterIndex + 1;

      [newChapters[chapterIndex], newChapters[swapIndex]] = [
        newChapters[swapIndex],
        newChapters[chapterIndex],
      ];

      // Update order numbers
      newChapters.forEach((chapter, index) => {
        chapter.order = index + 1;
      });

      setChapters(newChapters);
      updateCourse(newChapters);
    }
  };

  const updateCourse = (updatedChapters: Chapter[]) => {
    onUpdateCourse({
      ...course,
      chapters: updatedChapters,
    });
  };

  const getTotalLessons = () => {
    return chapters.reduce(
      (total, chapter) => total + chapter.lessons.length,
      0
    );
  };

  const getTotalDuration = () => {
    return chapters.reduce(
      (total, chapter) =>
        total +
        chapter.lessons.reduce(
          (chapterTotal, lesson) => chapterTotal + lesson.duration,
          0
        ),
      0
    );
  };

  const getQuizzesCount = () => {
    return chapters.filter((chapter) => chapter.quiz).length;
  };

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            {course.title} - Chapter Management
          </CardTitle>
          <CardDescription>
            Organize your course content into chapters with lessons and quizzes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {chapters.length}
              </div>
              <div className="text-sm text-blue-600">Chapters</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getTotalLessons()}
              </div>
              <div className="text-sm text-green-600">Total Lessons</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {getQuizzesCount()}
              </div>
              <div className="text-sm text-purple-600">Chapter Quizzes</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {getTotalDuration()}
              </div>
              <div className="text-sm text-orange-600">Total Minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="lessons" disabled={!selectedChapter}>
            Lessons {selectedChapter && `(${selectedChapter.title})`}
          </TabsTrigger>
          <TabsTrigger value="quiz" disabled={!selectedChapter}>
            Chapter Quiz
          </TabsTrigger>
          <TabsTrigger value="final-test">Final Course Test</TabsTrigger>
        </TabsList>

        <TabsContent value="chapters" className="space-y-6">
          {/* Add New Chapter */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Chapter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Chapter title"
                  value={newChapter.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewChapter((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <Button
                  onClick={handleAddChapter}
                  disabled={!newChapter.title.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Chapter
                </Button>
              </div>
              <Textarea
                placeholder="Chapter description"
                value={newChapter.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewChapter((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </CardContent>
          </Card>

          {/* Chapters List */}
          <Card>
            <CardHeader>
              <CardTitle>Course Chapters</CardTitle>
              <CardDescription>
                Manage the structure and order of your course chapters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chapters.map((chapter) => (
                    <TableRow key={chapter.id}>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                            {chapter.order}
                          </span>
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveChapter(chapter.id, "up")}
                              disabled={chapter.order === 1}
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveChapter(chapter.id, "down")}
                              disabled={chapter.order === chapters.length}
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{chapter.title}</div>
                          {chapter.description && (
                            <div className="text-sm text-gray-500 truncate max-w-60">
                              {chapter.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {chapter.lessons.length} lessons
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {chapter.quiz ? (
                          <Badge className="bg-green-100 text-green-800">
                            <QuizIcon className="w-3 h-3 mr-1" />
                            Quiz Added
                          </Badge>
                        ) : (
                          <Badge variant="outline">No Quiz</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          {chapter.lessons.reduce(
                            (total, lesson) => total + lesson.duration,
                            0
                          )}{" "}
                          min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChapter(chapter);
                              setActiveTab("lessons");
                            }}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChapter(chapter);
                              setActiveTab("quiz");
                            }}
                          >
                            <QuizIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteChapter(chapter.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons">
          {selectedChapter && (
            <LessonManager
              chapter={selectedChapter}
              onUpdateChapter={handleUpdateChapter}
            />
          )}
        </TabsContent>

        <TabsContent value="quiz">
          {selectedChapter && (
            <QuizManager
              chapter={selectedChapter}
              onUpdateChapter={handleUpdateChapter}
              type="chapter"
            />
          )}
        </TabsContent>

        <TabsContent value="final-test">
          <QuizManager
            chapter={null}
            onUpdateChapter={() => {}}
            type="final"
            course={course}
            onUpdateCourse={onUpdateCourse}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterManager;
