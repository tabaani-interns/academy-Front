# Tutor Course Management System

This is a comprehensive course management system for tutors to create, edit, and manage their courses in a Coursera-like structure.

## Features

### 📚 Course Management
- **Create & Edit Courses**: Complete course information including title, description, pricing, level, category
- **Course Settings**: Configure course details, learning objectives, prerequisites, duration
- **Certificate Management**: Option to provide certificates upon completion
- **Thumbnail Upload**: Add course cover images
- **Multi-language Support**: Set course language
- **Status Management**: Draft, Published, Archived statuses

### 📖 Chapter Structure
- **Chapter Organization**: Create and organize course chapters
- **Drag & Drop Ordering**: Reorder chapters easily
- **Chapter Descriptions**: Add detailed chapter information
- **Progress Tracking**: Monitor chapter completion

### 🎓 Lesson Management
- **Video Lessons**: Upload and manage video content
- **Lesson Materials**: Attach PDFs, documents, images, and external links
- **Lesson Duration**: Set estimated completion time
- **Lesson Ordering**: Organize lessons within chapters
- **Content Types**: Support for multiple content formats

### 📝 Quiz System
- **Chapter Quizzes**: Create quizzes at the end of each chapter
- **Final Course Test**: Comprehensive test covering entire course
- **Question Types**:
  - Multiple Choice
  - True/False
  - Multiple Select (Toggle)
- **Quiz Settings**:
  - Passing score configuration
  - Time limits (optional)
  - Question explanations
  - Randomization options

### 📊 Analytics & Tracking
- **Course Statistics**: Track students, ratings, earnings
- **Progress Monitoring**: Monitor student completion rates
- **Performance Metrics**: Course and lesson analytics

## Component Structure

```
components/tutor/
├── CourseManagement.tsx     # Main course management interface
├── CourseForm.tsx          # Course creation/editing form
├── ChapterManager.tsx      # Chapter organization and management
├── LessonManager.tsx       # Lesson content and materials
├── QuizManager.tsx         # Quiz creation and management
└── index.ts               # Component exports
```

## Usage

### For Tutors

1. **Navigate to Tutor Dashboard**
   ```
   /tutor
   ```

2. **Create a New Course**
   - Click "Create New Course"
   - Fill in course details (title, description, pricing, etc.)
   - Set learning objectives and prerequisites
   - Save as draft or publish

3. **Add Chapters**
   - Select a course
   - Go to "Chapter Management" tab
   - Add chapter title and description
   - Organize chapter order

4. **Create Lessons**
   - Select a chapter
   - Go to "Lessons" tab
   - Add lesson details
   - Upload video content
   - Attach learning materials

5. **Create Quizzes**
   - Add chapter quiz after lessons
   - Create questions with multiple types
   - Set passing scores and time limits
   - Add explanations for answers

6. **Final Course Test**
   - Create comprehensive test
   - Cover all course topics
   - Set certification requirements

## Course Structure

```
Course
├── Basic Information
│   ├── Title, Description
│   ├── Price, Level, Category
│   ├── Learning Objectives
│   └── Prerequisites
├── Chapters (Multiple)
│   ├── Chapter 1
│   │   ├── Lessons (Multiple)
│   │   │   ├── Video Content
│   │   │   ├── Materials (PDFs, docs, links)
│   │   │   └── Duration
│   │   └── Chapter Quiz
│   ├── Chapter 2
│   │   ├── Lessons...
│   │   └── Chapter Quiz
│   └── Chapter N...
└── Final Course Test
    ├── Comprehensive Questions
    ├── Certification Requirements
    └── Passing Criteria
```

## API Integration

The components are designed to work with a backend API. Key endpoints needed:

```typescript
// Courses
POST /api/courses              // Create course
PUT /api/courses/:id          // Update course
DELETE /api/courses/:id       // Delete course
GET /api/courses              // List courses

// Chapters
POST /api/courses/:id/chapters     // Add chapter
PUT /api/chapters/:id             // Update chapter
DELETE /api/chapters/:id          // Delete chapter

// Lessons
POST /api/chapters/:id/lessons    // Add lesson
PUT /api/lessons/:id             // Update lesson
DELETE /api/lessons/:id          // Delete lesson

// Quizzes
POST /api/courses/:id/quiz       // Create final test
POST /api/chapters/:id/quiz      // Create chapter quiz
PUT /api/quizzes/:id            // Update quiz

// File Uploads
POST /api/upload/video          // Upload video
POST /api/upload/material       // Upload materials
POST /api/upload/thumbnail      // Upload course image
```

## Data Models

### Course
```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  language: string;
  duration: number;
  status: 'Draft' | 'Published' | 'Archived';
  certificate: boolean;
  learningObjectives: string[];
  prerequisites: string[];
  chapters: Chapter[];
  finalTest?: Quiz;
  students: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
```

### Chapter
```typescript
interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz: Quiz | null;
}
```

### Lesson
```typescript
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
```

### Quiz
```typescript
interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}
```

## Styling

The components use Tailwind CSS with a custom design system. Key design principles:

- **Clean Interface**: Minimal, focused design
- **Responsive Layout**: Works on all device sizes
- **Consistent Colors**: Uses brand color palette
- **Intuitive Navigation**: Clear tabs and sections
- **Visual Feedback**: Loading states, success/error messages

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install lucide-react
   ```

2. **Import Components**
   ```typescript
   import { CourseManagement } from '@/components/tutor';
   ```

3. **Use in Tutor Dashboard**
   ```typescript
   export default function TutorPage() {
     return <CourseManagement />;
   }
   ```

## Future Enhancements

- **Live Video Integration**: Real-time streaming capabilities
- **Student Communication**: Discussion forums and messaging
- **Advanced Analytics**: Detailed performance insights
- **Content Templates**: Pre-built course structures
- **Collaboration Tools**: Multi-tutor course creation
- **Mobile App**: Native mobile application
- **AI Assistance**: Content suggestions and optimization

## Support

For questions or issues with the course management system, please refer to the documentation or contact the development team.
