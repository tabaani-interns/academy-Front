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
  Edit3,
  Trash2,
  Play,
  FileText,
  Clock,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Video,
  File,
  Link,
  Image as ImageIcon,
} from "lucide-react";

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

interface LessonManagerProps {
  chapter: Chapter;
  onUpdateChapter: (chapter: Chapter) => void;
}

const LessonManager: React.FC<LessonManagerProps> = ({
  chapter,
  onUpdateChapter,
}) => {
  const [lessons, setLessons] = useState<Lesson[]>(chapter.lessons || []);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: 0,
  });
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "pdf" as "pdf" | "doc" | "video" | "image" | "link",
    url: "",
  });

  const handleAddLesson = () => {
    if (newLesson.title.trim()) {
      const lesson: Lesson = {
        id: Math.max(...lessons.map((l) => l.id), 0) + 1,
        title: newLesson.title,
        description: newLesson.description,
        videoUrl: newLesson.videoUrl,
        duration: newLesson.duration,
        order: lessons.length + 1,
        materials: [],
        completed: false,
      };

      const updatedLessons = [...lessons, lesson];
      setLessons(updatedLessons);
      updateChapter(updatedLessons);
      setNewLesson({ title: "", description: "", videoUrl: "", duration: 0 });
    }
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    const updatedLessons = lessons.map((l) =>
      l.id === updatedLesson.id ? updatedLesson : l
    );
    setLessons(updatedLessons);
    updateChapter(updatedLessons);
    setSelectedLesson(updatedLesson);
  };

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      const updatedLessons = lessons
        .filter((l) => l.id !== lessonId)
        .map((l, index) => ({ ...l, order: index + 1 }));
      setLessons(updatedLessons);
      updateChapter(updatedLessons);
      if (selectedLesson?.id === lessonId) {
        setSelectedLesson(null);
      }
    }
  };

  const moveLesson = (lessonId: number, direction: "up" | "down") => {
    const lessonIndex = lessons.findIndex((l) => l.id === lessonId);
    if (
      (direction === "up" && lessonIndex > 0) ||
      (direction === "down" && lessonIndex < lessons.length - 1)
    ) {
      const newLessons = [...lessons];
      const swapIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1;

      [newLessons[lessonIndex], newLessons[swapIndex]] = [
        newLessons[swapIndex],
        newLessons[lessonIndex],
      ];

      // Update order numbers
      newLessons.forEach((lesson, index) => {
        lesson.order = index + 1;
      });

      setLessons(newLessons);
      updateChapter(newLessons);
    }
  };

  const handleAddMaterial = () => {
    if (selectedLesson && newMaterial.name.trim() && newMaterial.url.trim()) {
      const material: Material = {
        id: Math.max(...selectedLesson.materials.map((m) => m.id), 0) + 1,
        name: newMaterial.name,
        type: newMaterial.type,
        url: newMaterial.url,
      };

      const updatedLesson = {
        ...selectedLesson,
        materials: [...selectedLesson.materials, material],
      };

      handleUpdateLesson(updatedLesson);
      setNewMaterial({ name: "", type: "pdf", url: "" });
      setIsAddingMaterial(false);
    }
  };

  const handleDeleteMaterial = (materialId: number) => {
    if (selectedLesson) {
      const updatedLesson = {
        ...selectedLesson,
        materials: selectedLesson.materials.filter((m) => m.id !== materialId),
      };
      handleUpdateLesson(updatedLesson);
    }
  };

  const updateChapter = (updatedLessons: Lesson[]) => {
    onUpdateChapter({
      ...chapter,
      lessons: updatedLessons,
    });
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "pdf":
      case "doc":
        return <FileText className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "link":
        return <Link className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getTotalDuration = () => {
    return lessons.reduce((total, lesson) => total + lesson.duration, 0);
  };

  return (
    <div className="space-y-6">
      {/* Chapter Info */}
      <Card>
        <CardHeader>
          <CardTitle>{chapter.title} - Lesson Management</CardTitle>
          <CardDescription>
            Manage lessons, videos, and materials for this chapter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {lessons.length}
              </div>
              <div className="text-sm text-blue-600">Lessons</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getTotalDuration()}
              </div>
              <div className="text-sm text-green-600">Total Minutes</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {lessons.reduce(
                  (total, lesson) => total + lesson.materials.length,
                  0
                )}
              </div>
              <div className="text-sm text-purple-600">Materials</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lessons List */}
        <Card>
          <CardHeader>
            <CardTitle>Chapter Lessons</CardTitle>
            <CardDescription>
              Add and organize lessons in this chapter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Lesson */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-semibold">Add New Lesson</h4>
              <Input
                placeholder="Lesson title"
                value={newLesson.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewLesson((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Textarea
                placeholder="Lesson description"
                value={newLesson.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewLesson((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Video URL (optional)"
                  value={newLesson.videoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      videoUrl: e.target.value,
                    }))
                  }
                />
                <Input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newLesson.duration || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      duration: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <Button
                onClick={handleAddLesson}
                disabled={!newLesson.title.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson
              </Button>
            </div>

            {/* Lessons Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableRow
                    key={lesson.id}
                    className={
                      selectedLesson?.id === lesson.id ? "bg-blue-50" : ""
                    }
                  >
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                          {lesson.order}
                        </span>
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveLesson(lesson.id, "up")}
                            disabled={lesson.order === 1}
                          >
                            <ChevronUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveLesson(lesson.id, "down")}
                            disabled={lesson.order === lessons.length}
                          >
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{lesson.title}</div>
                        {lesson.description && (
                          <div className="text-sm text-gray-500 truncate max-w-40">
                            {lesson.description}
                          </div>
                        )}
                        {lesson.videoUrl && (
                          <Badge variant="secondary" className="mt-1">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-500" />
                        {lesson.duration} min
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Lesson Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedLesson
                ? `Lesson: ${selectedLesson.title}`
                : "Select a Lesson"}
            </CardTitle>
            <CardDescription>
              {selectedLesson
                ? "Manage lesson content and materials"
                : "Choose a lesson to edit its details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedLesson ? (
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={selectedLesson.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSelectedLesson((prev) =>
                          prev ? { ...prev, title: e.target.value } : null
                        )
                      }
                    />
                    <Textarea
                      value={selectedLesson.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setSelectedLesson((prev) =>
                          prev ? { ...prev, description: e.target.value } : null
                        )
                      }
                      rows={3}
                    />
                    <Input
                      placeholder="Video URL"
                      value={selectedLesson.videoUrl || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSelectedLesson((prev) =>
                          prev ? { ...prev, videoUrl: e.target.value } : null
                        )
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Duration (minutes)"
                      value={selectedLesson.duration}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSelectedLesson((prev) =>
                          prev
                            ? {
                                ...prev,
                                duration: parseInt(e.target.value) || 0,
                              }
                            : null
                        )
                      }
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          handleUpdateLesson(selectedLesson);
                          setIsEditing(false);
                        }}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Lesson Details</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedLesson.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedLesson.duration} minutes
                        </div>
                        {selectedLesson.videoUrl && (
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-1" />
                            Video included
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="mt-3"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Lesson
                      </Button>
                    </div>

                    {/* Materials Section */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Lesson Materials</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddingMaterial(true)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Material
                        </Button>
                      </div>

                      {isAddingMaterial && (
                        <div className="border rounded-lg p-3 mb-3 space-y-2">
                          <Input
                            placeholder="Material name"
                            value={newMaterial.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setNewMaterial((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={newMaterial.type}
                              onChange={(e) =>
                                setNewMaterial((prev) => ({
                                  ...prev,
                                  type: e.target.value as any,
                                }))
                              }
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <option value="pdf">PDF Document</option>
                              <option value="doc">Word Document</option>
                              <option value="video">Video</option>
                              <option value="image">Image</option>
                              <option value="link">External Link</option>
                            </select>
                            <Input
                              placeholder="URL or file path"
                              value={newMaterial.url}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setNewMaterial((prev) => ({
                                  ...prev,
                                  url: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={handleAddMaterial}>
                              <Save className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsAddingMaterial(false);
                                setNewMaterial({
                                  name: "",
                                  type: "pdf",
                                  url: "",
                                });
                              }}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        {selectedLesson.materials.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <div className="flex items-center space-x-2">
                              {getMaterialIcon(material.type)}
                              <span className="text-sm font-medium">
                                {material.name}
                              </span>
                              <Badge variant="outline">{material.type}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        {selectedLesson.materials.length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No materials added yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a lesson from the left to manage its content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonManager;
