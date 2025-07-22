"use client";

import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Custom tooltip component
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-stroke rounded-lg shadow-lg">
        <p className="text-body2 font-medium text-black">{data.name}</p>
        <p className="text-body2 text-black-75">{data.value}% of courses</p>
      </div>
    );
  }
  return null;
};

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
  { month: 'Apr', revenue: 4500, expenses: 3908, profit: 592 },
  { month: 'May', revenue: 6000, expenses: 4800, profit: 1200 },
  { month: 'Jun', revenue: 7000, expenses: 3800, profit: 3200 },
];

const userGrowthData = [
  { month: 'Jan', users: 1000, active: 750 },
  { month: 'Feb', users: 1100, active: 825 },
  { month: 'Mar', users: 1250, active: 1000 },
  { month: 'Apr', users: 1300, active: 1040 },
  { month: 'May', users: 1450, active: 1160 },
  { month: 'Jun', users: 1600, active: 1280 },
];

const courseDistributionData = [
  { name: 'Programming', value: 35, color: '#FFAF20' },
  { name: 'Design', value: 25, color: '#F79646' },
  { name: 'Business', value: 20, color: '#3E3232' },
  { name: 'Marketing', value: 12, color: '#00C853' },
  { name: 'Others', value: 8, color: '#2962FF' },
];

const tutorEarningsData = [
  { month: 'Jan', earnings: 12000, tutors: 25 },
  { month: 'Feb', earnings: 13500, tutors: 28 },
  { month: 'Mar', earnings: 15200, tutors: 32 },
  { month: 'Apr', earnings: 14800, tutors: 35 },
  { month: 'May', earnings: 16500, tutors: 38 },
  { month: 'Jun', earnings: 18200, tutors: 42 },
];

const revenueConfig = {
  revenue: {
    label: 'Revenue',
    color: '#FFAF20',
  },
  expenses: {
    label: 'Expenses',
    color: '#F79646',
  },
  profit: {
    label: 'Profit',
    color: '#00C853',
  },
};

const userGrowthConfig = {
  users: {
    label: 'Total Users',
    color: '#FFAF20',
  },
  active: {
    label: 'Active Users',
    color: '#F79646',
  },
};

const tutorEarningsConfig = {
  earnings: {
    label: 'Earnings ($)',
    color: '#FFAF20',
  },
  tutors: {
    label: 'Active Tutors',
    color: '#F79646',
  },
};

export function RevenueChart() {
  return (
    <ChartContainer config={revenueConfig} className="h-[300px] w-full">
      <AreaChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <YAxis 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stackId="1"
          stroke="#FFAF20"
          fill="#FFAF20"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="1"
          stroke="#F79646"
          fill="#F79646"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function UserGrowthChart() {
  return (
    <ChartContainer config={userGrowthConfig} className="h-[300px] w-full">
      <LineChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <YAxis 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#FFAF20"
          strokeWidth={3}
          dot={{ fill: '#FFAF20', strokeWidth: 2, r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="active"
          stroke="#F79646"
          strokeWidth={3}
          dot={{ fill: '#F79646', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function CourseDistributionChart() {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <PieChart>
        <Pie
          data={courseDistributionData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {courseDistributionData.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<CustomPieTooltip />} />
      </PieChart>
    </ChartContainer>
  );
}

export function TutorEarningsChart() {
  return (
    <ChartContainer config={tutorEarningsConfig} className="h-[300px] w-full">
      <BarChart data={tutorEarningsData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <YAxis 
          tick={{ fill: '#5C4C4C', fontSize: 12 }}
          tickLine={{ stroke: '#E0E0E0' }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="earnings" fill="#FFAF20" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
