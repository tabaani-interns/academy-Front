"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Clock,
  MessageSquare,
} from "lucide-react";
import { TutorEarningsChart, UserGrowthChart } from "@/components/AdminCharts";

// Sample data for tutor dashboard
const tutorStats = {
  totalCourses: 12,
  totalStudents: 450,
  monthlyEarnings: 5600,
  averageRating: 4.9,
  completionRate: 87,
  activeStudents: 320,
};

const myCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    students: 156,
    rating: 4.8,
    price: 199,
    status: "Published",
    lastUpdated: "2024-07-15",
    earnings: 2400,
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    students: 234,
    rating: 4.9,
    price: 149,
    status: "Published",
    lastUpdated: "2024-07-10",
    earnings: 1800,
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    students: 89,
    rating: 4.7,
    price: 249,
    status: "Draft",
    lastUpdated: "2024-07-20",
    earnings: 0,
  },
  {
    id: 4,
    title: "TypeScript Mastery",
    students: 67,
    rating: 4.6,
    price: 179,
    status: "Published",
    lastUpdated: "2024-07-08",
    earnings: 1200,
  },
];

const recentStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    course: "Advanced React Development",
    progress: 75,
    lastActive: "2 hours ago",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    course: "JavaScript Fundamentals",
    progress: 90,
    lastActive: "1 day ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Carol Williams",
    course: "TypeScript Mastery",
    progress: 45,
    lastActive: "3 days ago",
    status: "Inactive",
  },
  {
    id: 4,
    name: "David Brown",
    course: "Advanced React Development",
    progress: 60,
    lastActive: "5 hours ago",
    status: "Active",
  },
];

const recentReviews = [
  {
    id: 1,
    student: "Emma Davis",
    course: "JavaScript Fundamentals",
    rating: 5,
    comment: "Excellent course! Very well explained concepts.",
    date: "2024-07-22",
  },
  {
    id: 2,
    student: "Michael Chen",
    course: "Advanced React Development",
    rating: 4,
    comment: "Great content, but could use more practical examples.",
    date: "2024-07-21",
  },
  {
    id: 3,
    student: "Sarah Wilson",
    course: "TypeScript Mastery",
    rating: 5,
    comment: "Perfect introduction to TypeScript!",
    date: "2024-07-20",
  },
];

const earnings = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 4800 },
  { month: "Mar", amount: 5200 },
  { month: "Apr", amount: 4900 },
  { month: "May", amount: 5600 },
  { month: "Jun", amount: 6100 },
];

export default function TutorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-black">My Teaching Dashboard</h2>
        <Button className="bg-secondary hover:bg-secondary-75 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-stroke">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            My Courses
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            Students
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {tutorStats.totalCourses}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+2</span> this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {tutorStats.totalStudents}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+23</span> new this week
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Monthly Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  ${tutorStats.monthlyEarnings.toLocaleString()}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+15%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {tutorStats.averageRating}
                </div>
                <p className="text-body2 text-black-50">Based on all courses</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Completion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {tutorStats.completionRate}%
                </div>
                <Progress value={tutorStats.completionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Active Students
                </CardTitle>
                <Clock className="h-4 w-4 text-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {tutorStats.activeStudents}
                </div>
                <p className="text-body2 text-black-50">Currently learning</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Recent Student Activity
                </CardTitle>
                <CardDescription className="text-black-50">
                  Latest student progress updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentStudents.slice(0, 4).map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-10 text-primary">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-body2 font-medium text-black">
                          {student.name}
                        </p>
                        <p className="text-body2 text-black-50">
                          {student.course}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-body2 font-medium text-black">
                        {student.progress}%
                      </p>
                      <p className="text-body2 text-black-50">
                        {student.lastActive}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Recent Reviews
                </CardTitle>
                <CardDescription className="text-black-50">
                  Latest student feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-body2 font-medium text-black">
                        {review.student}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="text-body2 text-black">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-body2 text-black-75">{review.comment}</p>
                    <p className="text-body2 text-black-50">
                      {review.course} • {review.date}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">My Courses</CardTitle>
              <CardDescription className="text-black-50">
                Manage your published and draft courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black-75">Course</TableHead>
                    <TableHead className="text-black-75">Students</TableHead>
                    <TableHead className="text-black-75">Rating</TableHead>
                    <TableHead className="text-black-75">Price</TableHead>
                    <TableHead className="text-black-75">Earnings</TableHead>
                    <TableHead className="text-black-75">Status</TableHead>
                    <TableHead className="text-black-75">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <p className="text-body2 font-medium text-black">
                            {course.title}
                          </p>
                          <p className="text-body2 text-black-50">
                            Updated {course.lastUpdated}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 text-black">
                        {course.students}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-primary fill-current" />
                          <span className="text-body2 text-black">
                            {course.rating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 text-black">
                        ${course.price}
                      </TableCell>
                      <TableCell className="text-body2 font-medium text-green">
                        ${course.earnings.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            course.status === "Published"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            course.status === "Published"
                              ? "bg-green text-white"
                              : "bg-black-10 text-black-75"
                          }
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4" />
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

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">
                Student Management
              </CardTitle>
              <CardDescription className="text-black-50">
                View and manage your students' progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black-75">Student</TableHead>
                    <TableHead className="text-black-75">Course</TableHead>
                    <TableHead className="text-black-75">Progress</TableHead>
                    <TableHead className="text-black-75">Last Active</TableHead>
                    <TableHead className="text-black-75">Status</TableHead>
                    <TableHead className="text-black-75">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary-10 text-secondary">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-body2 font-medium text-black">
                            {student.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 text-black">
                        {student.course}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-body2 text-black">
                              {student.progress}%
                            </span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 text-black-50">
                        {student.lastActive}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            student.status === "Active"
                              ? "bg-green text-white"
                              : "bg-black-10 text-black-75"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Earnings Trend
                </CardTitle>
                <CardDescription className="text-black-50">
                  Your monthly earnings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TutorEarningsChart />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Student Enrollment
                </CardTitle>
                <CardDescription className="text-black-50">
                  New students joining your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>

          {/* Course Performance */}
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">
                Course Performance Analytics
              </CardTitle>
              <CardDescription className="text-black-50">
                Detailed metrics for each course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {myCourses
                .filter((course) => course.status === "Published")
                .map((course) => (
                  <div
                    key={course.id}
                    className="border border-stroke rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-body font-medium text-black">
                        {course.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className="border-secondary-25 text-secondary"
                      >
                        {course.students} students
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-h5 font-bold text-black">
                          {course.rating}
                        </p>
                        <p className="text-body2 text-black-50">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-h5 font-bold text-black">
                          ${course.earnings.toLocaleString()}
                        </p>
                        <p className="text-body2 text-black-50">Earnings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-h5 font-bold text-black">85%</p>
                        <p className="text-body2 text-black-50">Completion</p>
                      </div>
                      <div className="text-center">
                        <p className="text-h5 font-bold text-black">4.2h</p>
                        <p className="text-body2 text-black-50">
                          Avg. Watch Time
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
