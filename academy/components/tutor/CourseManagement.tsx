"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Plus, Edit3, Trash2, Users, Star } from "lucide-react";
import CourseForm from "./CourseForm";
import ChapterManager from "./ChapterManager";

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  status: "Draft" | "Published" | "Archived";
  chapters: Chapter[];
  certificate: boolean;
  createdAt: string;
  updatedAt: string;
  students: number;
  rating: number;
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

const CourseManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced React Development",
      description: "Master React with hooks, context, and modern patterns",
      thumbnail: "/Course.png",
      price: 199,
      level: "Advanced",
      category: "Web Development",
      status: "Published",
      chapters: [],
      certificate: true,
      createdAt: "2024-07-01",
      updatedAt: "2024-07-15",
      students: 156,
      rating: 4.8,
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Learn JavaScript from basics to advanced concepts",
      thumbnail: "/Course.png",
      price: 149,
      level: "Beginner",
      category: "Programming",
      status: "Published",
      chapters: [],
      certificate: true,
      createdAt: "2024-06-15",
      updatedAt: "2024-07-10",
      students: 234,
      rating: 4.9,
    },
  ]);

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setIsCreating(true);
    setActiveTab("create-edit");
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsCreating(false);
    setActiveTab("create-edit");
  };

  const handleDeleteCourse = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  const handleSaveCourse = (courseData: Partial<Course>) => {
    if (selectedCourse) {
      // Update existing course
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                ...courseData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : c
        )
      );
    } else {
      // Create new course
      const newCourse: Course = {
        id: Math.max(...courses.map((c) => c.id)) + 1,
        title: courseData.title || "",
        description: courseData.description || "",
        thumbnail: courseData.thumbnail || "/Course.png",
        price: courseData.price || 0,
        level: courseData.level || "Beginner",
        category: courseData.category || "",
        status: "Draft",
        chapters: [],
        certificate: courseData.certificate || false,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        students: 0,
        rating: 0,
      };
      setCourses([...courses, newCourse]);
    }
    setActiveTab("overview");
    setSelectedCourse(null);
    setIsCreating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-orange-100 text-orange-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create, edit, and manage your courses
          </p>
        </div>
        <Button
          onClick={handleCreateCourse}
          className="bg-black hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
          <TabsTrigger value="create-edit">
            {isCreating ? "Create Course" : "Edit Course"}
          </TabsTrigger>
          <TabsTrigger value="chapters" disabled={!selectedCourse}>
            Chapter Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {courses.filter((c) => c.status === "Published").length}{" "}
                  published
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courses.length > 0
                    ? (
                        courses.reduce(
                          (sum, course) => sum + course.rating,
                          0
                        ) / courses.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <p className="text-xs text-muted-foreground">Overall rating</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>
                Manage your course content, chapters, and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <div className="font-semibold">{course.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-48">
                              {course.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {course.rating}
                        </div>
                      </TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.updatedAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(course);
                              setActiveTab("chapters");
                            }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
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

        <TabsContent value="create-edit">
          <CourseForm
            course={selectedCourse}
            onSave={handleSaveCourse}
            onCancel={() => {
              setActiveTab("overview");
              setSelectedCourse(null);
              setIsCreating(false);
            }}
          />
        </TabsContent>

        <TabsContent value="chapters">
          {selectedCourse && (
            <ChapterManager
              course={selectedCourse}
              onUpdateCourse={(updatedCourse: Course) => {
                setCourses(
                  courses.map((c) =>
                    c.id === updatedCourse.id ? updatedCourse : c
                  )
                );
                setSelectedCourse(updatedCourse);
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;
