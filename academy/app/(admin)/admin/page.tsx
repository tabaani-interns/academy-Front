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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Shield,
} from "lucide-react";
import {
  RevenueChart,
  UserGrowthChart,
  CourseDistributionChart,
  TutorEarningsChart,
} from "@/components/AdminCharts";

// Sample data for administration
const platformStats = {
  totalUsers: 1234,
  totalCourses: 89,
  totalRevenue: 45678,
  activeStudents: 567,
  completionRate: 78,
  averageRating: 4.6,
  totalTutors: 45,
  activeTutors: 38,
};

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-15",
    status: "Active",
    type: "Student",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2024-01-14",
    status: "Active",
    type: "Tutor",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    joinDate: "2024-01-13",
    status: "Inactive",
    type: "Student",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    joinDate: "2024-01-12",
    status: "Active",
    type: "Student",
  },
];

const topTutors = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    courses: 12,
    students: 450,
    rating: 4.9,
    earnings: 5600,
    status: "Verified",
  },
  {
    id: 2,
    name: "Prof. Alex Thompson",
    courses: 8,
    students: 320,
    rating: 4.8,
    earnings: 4200,
    status: "Verified",
  },
  {
    id: 3,
    name: "Dr. Maria Rodriguez",
    courses: 15,
    students: 380,
    rating: 4.7,
    earnings: 3800,
    status: "Pending",
  },
  {
    id: 4,
    name: "Prof. James Wilson",
    courses: 6,
    students: 210,
    rating: 4.8,
    earnings: 3200,
    status: "Verified",
  },
];

const coursePerformance = [
  {
    name: "JavaScript Fundamentals",
    students: 156,
    completion: 85,
    rating: 4.7,
  },
  { name: "React Advanced", students: 134, completion: 78, rating: 4.8 },
  { name: "Python for Beginners", students: 298, completion: 92, rating: 4.6 },
  { name: "UI/UX Design", students: 89, completion: 73, rating: 4.5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-black">
          Platform Administration
        </h2>
        <div className="flex items-center space-x-2">
          <Badge
            variant="secondary"
            className="bg-primary-10 text-primary border-primary-25"
          >
            <Shield className="w-3 h-3 mr-1" />
            Administrator
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-stroke">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Platform Overview
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            System Analytics
          </TabsTrigger>
        </TabsList>

        {/* Platform Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Platform Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {platformStats.totalUsers.toLocaleString()}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {platformStats.totalCourses}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+5</span> new this week
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Platform Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  ${platformStats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+23%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Active Tutors
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {platformStats.activeTutors}
                </div>
                <p className="text-body2 text-black-50">
                  of {platformStats.totalTutors} total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue and User Growth Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Revenue Overview
                </CardTitle>
                <CardDescription className="text-black-50">
                  Platform revenue and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  User Growth
                </CardTitle>
                <CardDescription className="text-black-50">
                  Platform user growth metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>

          {/* Course Distribution Chart */}
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">
                Course Distribution
              </CardTitle>
              <CardDescription className="text-black-50">
                Distribution of courses by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
                <div className="w-full lg:w-1/2">
                  <CourseDistributionChart />
                </div>
                <div className="w-full lg:w-1/2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-body2 text-black">Programming</span>
                    </div>
                    <span className="text-body2 font-medium text-black">
                      35%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-body2 text-black">Design</span>
                    </div>
                    <span className="text-body2 font-medium text-black">
                      25%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span className="text-body2 text-black">Business</span>
                    </div>
                    <span className="text-body2 font-medium text-black">
                      20%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green rounded-full"></div>
                      <span className="text-body2 text-black">Marketing</span>
                    </div>
                    <span className="text-body2 font-medium text-black">
                      12%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue rounded-full"></div>
                      <span className="text-body2 text-black">Others</span>
                    </div>
                    <span className="text-body2 font-medium text-black">
                      8%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Recent Registrations
                </CardTitle>
                <CardDescription className="text-black-50">
                  Latest user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black-75">User</TableHead>
                      <TableHead className="text-black-75">Type</TableHead>
                      <TableHead className="text-black-75">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary-10 text-primary">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="text-body2 text-black">
                                {user.name}
                              </span>
                              <p className="text-xs text-black-50">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.type === "Tutor"
                                ? "border-secondary-25 text-secondary"
                                : "border-primary-25 text-primary"
                            }
                          >
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Active" ? "default" : "secondary"
                            }
                            className={
                              user.status === "Active"
                                ? "bg-green text-white"
                                : "bg-black-10 text-black-75"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Tutors Management */}
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Tutor Verification
                </CardTitle>
                <CardDescription className="text-black-50">
                  Manage tutor verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black-75">Tutor</TableHead>
                      <TableHead className="text-black-75">Courses</TableHead>
                      <TableHead className="text-black-75">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTutors.slice(0, 4).map((tutor) => (
                      <TableRow key={tutor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-secondary-10 text-secondary">
                                {tutor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="text-body2 text-black">
                                {tutor.name}
                              </span>
                              <p className="text-xs text-black-50">
                                {tutor.students} students
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-body2 text-black">
                          {tutor.courses}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tutor.status === "Verified"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              tutor.status === "Verified"
                                ? "bg-green text-white"
                                : "bg-orange-500 text-white"
                            }
                          >
                            {tutor.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Course Performance for Admin Review */}
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">
                Course Performance Review
              </CardTitle>
              <CardDescription className="text-black-50">
                Monitor course quality and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {coursePerformance.map((course) => (
                <div
                  key={course.name}
                  className="border border-stroke rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body2 font-medium text-black">
                      {course.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary-25 text-primary"
                    >
                      {course.students} students
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-body2 text-black-50">
                        Completion Rate
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-body2 font-medium text-black">
                          {course.completion}%
                        </span>
                        <Progress
                          value={course.completion}
                          className="h-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-body2 text-black-50">Average Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="text-body2 font-medium text-black">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-body2 text-black-50">Status</p>
                      <Badge variant="default" className="bg-green text-white">
                        Approved
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Analytics Tab */}
        <TabsContent value="system" className="space-y-6">
          {/* Platform Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Tutor Earnings Distribution
                </CardTitle>
                <CardDescription className="text-black-50">
                  How earnings are distributed across tutors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TutorEarningsChart />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">
                  Platform Activity
                </CardTitle>
                <CardDescription className="text-black-50">
                  Daily active users and course engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>

          {/* Additional System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Completion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {platformStats.completionRate}%
                </div>
                <Progress
                  value={platformStats.completionRate}
                  className="mt-2"
                />
                <p className="text-body2 text-black-50 mt-2">
                  Platform average
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
                  {platformStats.averageRating}
                </div>
                <p className="text-body2 text-black-50">Across all courses</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">
                  Active Sessions
                </CardTitle>
                <Clock className="h-4 w-4 text-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">
                  {platformStats.activeStudents}
                </div>
                <p className="text-body2 text-black-50">Currently online</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
