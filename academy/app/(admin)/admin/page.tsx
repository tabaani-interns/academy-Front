"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Award,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import { 
  RevenueChart, 
  UserGrowthChart, 
  CourseDistributionChart, 
  TutorEarningsChart 
} from '@/components/AdminCharts';

// Sample data for demonstration
const adminStats = {
  totalUsers: 1234,
  totalCourses: 89,
  totalRevenue: 45678,
  activeStudents: 567,
  completionRate: 78,
  averageRating: 4.6
};

const tutorStats = {
  totalTutors: 45,
  activeTutors: 38,
  averageRating: 4.8,
  totalEarnings: 12340,
  coursesCreated: 156,
  studentsEnrolled: 890
};

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2024-01-15", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joinDate: "2024-01-14", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "2024-01-13", status: "Inactive" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", joinDate: "2024-01-12", status: "Active" },
];

const topTutors = [
  { id: 1, name: "Dr. Emily Carter", courses: 12, students: 450, rating: 4.9, earnings: 5600 },
  { id: 2, name: "Prof. Alex Thompson", courses: 8, students: 320, rating: 4.8, earnings: 4200 },
  { id: 3, name: "Dr. Maria Rodriguez", courses: 15, students: 380, rating: 4.7, earnings: 3800 },
  { id: 4, name: "Prof. James Wilson", courses: 6, students: 210, rating: 4.8, earnings: 3200 },
];

const coursePerformance = [
  { name: "JavaScript Fundamentals", students: 156, completion: 85, rating: 4.7 },
  { name: "React Advanced", students: 134, completion: 78, rating: 4.8 },
  { name: "Python for Beginners", students: 298, completion: 92, rating: 4.6 },
  { name: "UI/UX Design", students: 89, completion: 73, rating: 4.5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-black">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary-10 text-primary border-primary-25">
            Online
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="admin" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-stroke">
          <TabsTrigger 
            value="admin" 
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Admin Overview
          </TabsTrigger>
          <TabsTrigger 
            value="tutor" 
            className="data-[state=active]:bg-secondary data-[state=active]:text-white"
          >
            Tutor Management
          </TabsTrigger>
        </TabsList>

        {/* Admin Tab Content */}
        <TabsContent value="admin" className="space-y-6">
          {/* Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Total Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{adminStats.totalUsers.toLocaleString()}</div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{adminStats.totalCourses}</div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+5</span> new this week
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">${adminStats.totalRevenue.toLocaleString()}</div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+23%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Active Students</CardTitle>
                <GraduationCap className="h-4 w-4 text-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{adminStats.activeStudents}</div>
                <p className="text-body2 text-black-50">Currently online</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{adminStats.completionRate}%</div>
                <Progress value={adminStats.completionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{adminStats.averageRating}</div>
                <p className="text-body2 text-black-50">Out of 5 stars</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Users and Course Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">Recent Users</CardTitle>
                <CardDescription className="text-black-50">Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black-75">Name</TableHead>
                      <TableHead className="text-black-75">Status</TableHead>
                      <TableHead className="text-black-75">Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary-10 text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-body2 text-black">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                            className={user.status === 'Active' ? 'bg-green text-white' : 'bg-black-10 text-black-75'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-body2 text-black-50">{user.joinDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">Course Performance</CardTitle>
                <CardDescription className="text-black-50">Top performing courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {coursePerformance.map((course) => (
                  <div key={course.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-body2 font-medium text-black">{course.name}</span>
                      <Badge variant="outline" className="border-primary-25 text-primary">
                        {course.students} students
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-body2 text-black-50">
                        <span>Completion: {course.completion}%</span>
                        <span>Rating: {course.rating}/5</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Revenue and User Growth Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">Revenue Overview</CardTitle>
                <CardDescription className="text-black-50">Monthly revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">User Growth</CardTitle>
                <CardDescription className="text-black-50">Total and active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>

          {/* Course Distribution Chart */}
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">Course Distribution</CardTitle>
              <CardDescription className="text-black-50">Distribution of courses by category</CardDescription>
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
                    <span className="text-body2 font-medium text-black">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-body2 text-black">Design</span>
                    </div>
                    <span className="text-body2 font-medium text-black">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span className="text-body2 text-black">Business</span>
                    </div>
                    <span className="text-body2 font-medium text-black">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green rounded-full"></div>
                      <span className="text-body2 text-black">Marketing</span>
                    </div>
                    <span className="text-body2 font-medium text-black">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue rounded-full"></div>
                      <span className="text-body2 text-black">Others</span>
                    </div>
                    <span className="text-body2 font-medium text-black">8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutor Tab Content */}
        <TabsContent value="tutor" className="space-y-6">
          {/* Tutor Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Total Tutors</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{tutorStats.totalTutors}</div>
                <p className="text-body2 text-black-50">
                  <span className="text-green">+3</span> this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Active Tutors</CardTitle>
                <Clock className="h-4 w-4 text-green" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{tutorStats.activeTutors}</div>
                <p className="text-body2 text-black-50">Currently teaching</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Tutor Rating</CardTitle>
                <Star className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{tutorStats.averageRating}</div>
                <p className="text-body2 text-black-50">Average rating</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">${tutorStats.totalEarnings.toLocaleString()}</div>
                <p className="text-body2 text-black-50">This month</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Courses Created</CardTitle>
                <BookOpen className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{tutorStats.coursesCreated}</div>
                <p className="text-body2 text-black-50">Total courses</p>
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-subtitle2 font-medium text-black-75">Students Enrolled</CardTitle>
                <GraduationCap className="h-4 w-4 text-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold text-black">{tutorStats.studentsEnrolled}</div>
                <p className="text-body2 text-black-50">Across all courses</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Tutors Table */}
          <Card className="border-stroke">
            <CardHeader>
              <CardTitle className="text-h4 text-black">Top Performing Tutors</CardTitle>
              <CardDescription className="text-black-50">Highest rated and earning tutors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black-75">Tutor</TableHead>
                    <TableHead className="text-black-75">Courses</TableHead>
                    <TableHead className="text-black-75">Students</TableHead>
                    <TableHead className="text-black-75">Rating</TableHead>
                    <TableHead className="text-black-75">Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTutors.map((tutor, index) => (
                    <TableRow key={tutor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary-10 text-secondary">
                              {tutor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-body2 font-medium text-black">{tutor.name}</div>
                            {index === 0 && (
                              <Badge variant="outline" className="border-primary-25 text-primary text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                Top Performer
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 text-black">{tutor.courses}</TableCell>
                      <TableCell className="text-body2 text-black">{tutor.students}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-primary fill-current" />
                          <span className="text-body2 text-black">{tutor.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-body2 font-medium text-green">
                        ${tutor.earnings.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tutor Performance Chart Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">Monthly Earnings Trend</CardTitle>
                <CardDescription className="text-black-50">Tutor earnings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <TutorEarningsChart />
              </CardContent>
            </Card>

            <Card className="border-stroke">
              <CardHeader>
                <CardTitle className="text-h4 text-black">Course Creation Activity</CardTitle>
                <CardDescription className="text-black-50">New courses created by tutors</CardDescription>
              </CardHeader>
              <CardContent>
                <UserGrowthChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
