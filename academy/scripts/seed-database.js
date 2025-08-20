const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin12345678@cluster0.veacp0i.mongodb.net/tabaani-academy?retryWrites=true&w=majority&appName=Cluster0";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },
    githubId: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  category: { type: String, required: true },
  tags: [{ type: String }],
  language: { type: String, default: 'English' },
  duration: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrollmentCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  whatYouWillLearn: [{ type: String }],
  requirements: [{ type: String }],
  targetAudience: [{ type: String }],
}, {
  timestamps: true
});

// Chapter Schema
const ChapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: { type: Number, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Lesson Schema
const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    videoUrl: { type: String },
    duration: { type: Number }, // in minutes
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Quiz Schema
const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    questions: [
      {
        question: { type: String, required: true },
        type: {
          type: String,
          enum: ["multiple-choice", "true-false", "toggle"],
          required: true,
        },
        options: [{ type: String }], // For multiple choice
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
        points: { type: Number, default: 1 },
      },
    ],
    timeLimit: { type: Number }, // in minutes
    passingScore: { type: Number, default: 70 },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Models
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);
const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

// Dummy data
const dummyUsers = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "password123",
    role: "tutor",
    image: "/assets/images/instructors/john-smith.jpg",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "password123",
    role: "tutor",
    image: "/assets/images/instructors/sarah-johnson.jpg",
  },
  {
    name: "Mike Davis",
    email: "mike.davis@example.com",
    password: "password123",
    role: "tutor",
    image: "/assets/images/instructors/mike-davis.jpg",
  },
  {
    name: "Emily Chen",
    email: "emily.chen@example.com",
    password: "password123",
    role: "student",
    image: "/assets/images/students/emily-chen.jpg",
  },
  {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@example.com",
    password: "password123",
    role: "student",
    image: "/assets/images/students/alex-rodriguez.jpg",
  },
];

const dummyCourses = [
  {
    title: "Complete Web Development Bootcamp",
    description:
      "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and more. This comprehensive course will take you from beginner to full-stack developer.",
    shortDescription: "Learn full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js.",
    price: 89.99,
    originalPrice: 199.99,
    category: "Web Development",
    level: "beginner",
    duration: 2400, // 40 hours in minutes
    totalLessons: 12,
    language: "English",
    thumbnail: "/assets/images/course/web-development.jpg",
    tags: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
    requirements: [
      "Basic computer skills",
      "No programming experience required",
    ],
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Master JavaScript programming fundamentals",
      "Create dynamic web applications with React",
      "Build RESTful APIs with Node.js and Express",
      "Work with databases using MongoDB",
    ],
    targetAudience: [
      "Complete beginners to web development",
      "Anyone looking to become a full-stack developer",
      "Students wanting to learn modern web technologies"
    ],
    status: "published",
    enrollmentCount: 1250,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    title: "Python for Data Science",
    description:
      "Master Python programming for data analysis, visualization, and machine learning. Learn to work with data using pandas, numpy, matplotlib, and scikit-learn.",
    shortDescription: "Master Python programming for data analysis, visualization, and machine learning.",
    price: 79.99,
    originalPrice: 149.99,
    category: "Data Science",
    level: "intermediate",
    duration: 2100, // 35 hours in minutes
    totalLessons: 12,
    language: "English",
    thumbnail: "/assets/images/course/python-data-science.jpg",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    requirements: ["Basic programming knowledge", "High school mathematics"],
    whatYouWillLearn: [
      "Python programming fundamentals",
      "Data manipulation with Pandas",
      "Data visualization with Matplotlib and Seaborn",
      "Machine learning with Scikit-learn",
      "Statistical analysis and hypothesis testing",
    ],
    targetAudience: [
      "Aspiring data scientists",
      "Python developers wanting to learn data science",
      "Analysts looking to automate their work"
    ],
    status: "published",
    enrollmentCount: 890,
    rating: 4.7,
    reviewCount: 267,
  },
  {
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications using React Native and JavaScript. Learn to create native iOS and Android apps from a single codebase.",
    shortDescription: "Build cross-platform mobile applications using React Native and JavaScript.",
    price: 99.99,
    originalPrice: 179.99,
    category: "Mobile Development",
    level: "intermediate",
    duration: 1800, // 30 hours in minutes
    totalLessons: 12,
    language: "English",
    thumbnail: "/assets/images/course/react-native.jpg",
    tags: ["React Native", "JavaScript", "Mobile UI/UX", "API Integration"],
    requirements: ["JavaScript knowledge", "Basic React experience"],
    whatYouWillLearn: [
      "React Native fundamentals",
      "Building native mobile components",
      "Navigation in mobile apps",
      "Integrating with device features",
      "Publishing apps to app stores",
    ],
    targetAudience: [
      "React developers wanting to build mobile apps",
      "Mobile developers learning cross-platform development",
      "Entrepreneurs wanting to build their own apps"
    ],
    status: "published",
    enrollmentCount: 654,
    rating: 4.6,
    reviewCount: 198,
  },
  {
    title: "Digital Marketing Masterclass",
    description:
      "Complete guide to digital marketing including SEO, social media, email marketing, and analytics. Learn how to grow your business online effectively.",
    shortDescription: "Complete guide to digital marketing including SEO, social media, and email marketing.",
    price: 69.99,
    originalPrice: 129.99,
    category: "Marketing",
    level: "beginner",
    duration: 1500, // 25 hours in minutes
    totalLessons: 12,
    language: "English",
    thumbnail: "/assets/images/course/digital-marketing.jpg",
    tags: [
      "SEO",
      "Social Media Marketing",
      "Email Marketing",
      "Google Analytics",
    ],
    requirements: ["No prior experience required", "Access to internet"],
    whatYouWillLearn: [
      "Search Engine Optimization (SEO)",
      "Social media marketing strategies",
      "Email marketing campaigns",
      "Google Ads and Facebook Ads",
      "Analytics and performance tracking",
    ],
    targetAudience: [
      "Small business owners",
      "Marketing professionals",
      "Entrepreneurs starting online businesses"
    ],
    status: "published",
    enrollmentCount: 1100,
    rating: 4.5,
    reviewCount: 421,
  },
  {
    title: "Advanced JavaScript & TypeScript",
    description:
      "Deep dive into advanced JavaScript concepts and TypeScript for professional development. Master complex patterns and build scalable applications.",
    shortDescription: "Deep dive into advanced JavaScript concepts and TypeScript for professional development.",
    price: 94.99,
    originalPrice: 169.99,
    category: "Programming",
    level: "advanced",
    duration: 1680, // 28 hours in minutes
    totalLessons: 12,
    language: "English",
    thumbnail: "/assets/images/course/advanced-javascript.jpg",
    tags: ["Advanced JavaScript", "TypeScript", "Design Patterns", "Testing"],
    requirements: [
      "Solid JavaScript fundamentals",
      "1+ year programming experience",
    ],
    whatYouWillLearn: [
      "Advanced JavaScript patterns and concepts",
      "TypeScript for large-scale applications",
      "Asynchronous programming mastery",
      "Testing strategies and frameworks",
      "Performance optimization techniques",
    ],
    targetAudience: [
      "Experienced JavaScript developers",
      "Software engineers wanting to advance their skills",
      "Developers transitioning to TypeScript"
    ],
    status: "published",
    enrollmentCount: 456,
    rating: 4.9,
    reviewCount: 123,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({ email: { $ne: "admin@admin.com" } }); // Keep admin
    await Course.deleteMany({});
    await Chapter.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    // Create users
    console.log("👥 Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = [];

    for (const userData of dummyUsers) {
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
      console.log(`✅ Created user: ${user.name} (${user.role})`);
    }

    // Get tutors for course assignment
    const tutors = users.filter((user) => user.role === "tutor");

    // Create courses with chapters, lessons, and quizzes
    console.log("\n📚 Creating courses...");

    for (let i = 0; i < dummyCourses.length; i++) {
      const courseData = dummyCourses[i];
      const instructor = tutors[i % tutors.length];

      const course = new Course({
        ...courseData,
        tutorId: instructor._id,
      });
      await course.save();
      console.log(`✅ Created course: ${course.title}`);

      // Create chapters for this course
      const chapters = [];
      for (let chapterIndex = 1; chapterIndex <= 4; chapterIndex++) {
        const chapter = new Chapter({
          title: `Chapter ${chapterIndex}: ${getChapterTitle(courseData.category, chapterIndex)}`,
          description: `Learn about ${getChapterTitle(courseData.category, chapterIndex).toLowerCase()} in this comprehensive chapter.`,
          courseId: course._id,
          order: chapterIndex,
          isPublished: true,
        });
        await chapter.save();
        chapters.push(chapter);
        console.log(`  ✅ Created chapter: ${chapter.title}`);

        // Create lessons for this chapter
        const lessons = [];
        for (let lessonIndex = 1; lessonIndex <= 3; lessonIndex++) {
          const lesson = new Lesson({
            title: `Lesson ${lessonIndex}: ${getLessonTitle(courseData.category, chapterIndex, lessonIndex)}`,
            description: `Detailed lesson covering ${getLessonTitle(courseData.category, chapterIndex, lessonIndex).toLowerCase()}.`,
            content: getLessonContent(
              courseData.category,
              chapterIndex,
              lessonIndex
            ),
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
            chapterId: chapter._id,
            courseId: course._id,
            order: lessonIndex,
            isPublished: true,
            isFree: chapterIndex === 1 && lessonIndex === 1, // First lesson is free
          });
          await lesson.save();
          lessons.push(lesson);
          console.log(`    ✅ Created lesson: ${lesson.title}`);
        }

        // Update chapter with lessons
        chapter.lessons = lessons.map((lesson) => lesson._id);
        await chapter.save();

        // Create quiz for this chapter
        const quiz = new Quiz({
          title: `${chapter.title} - Quiz`,
          description: `Test your knowledge of ${chapter.title.toLowerCase()}.`,
          courseId: course._id,
          chapterId: chapter._id,
          questions: generateQuizQuestions(courseData.category, chapterIndex),
          timeLimit: 15,
          passingScore: 70,
          isPublished: true,
        });
        await quiz.save();
        console.log(`    ✅ Created quiz: ${quiz.title}`);
      }

      // Update course with chapters
      course.chapters = chapters.map((chapter) => chapter._id);
      await course.save();
    }

    console.log("\n🎉 Database seeded successfully!");
    console.log(`📊 Created:`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${dummyCourses.length} courses`);
    console.log(`   - ${dummyCourses.length * 4} chapters`);
    console.log(`   - ${dummyCourses.length * 4 * 3} lessons`);
    console.log(`   - ${dummyCourses.length * 4} quizzes`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

// Helper functions
function getChapterTitle(category, chapterIndex) {
  const titles = {
    "Web Development": [
      "Introduction to Web Technologies",
      "Frontend Development Fundamentals",
      "Backend Development Basics",
      "Full-Stack Integration",
    ],
    "Data Science": [
      "Python Programming Basics",
      "Data Manipulation and Analysis",
      "Data Visualization",
      "Machine Learning Fundamentals",
    ],
    "Mobile Development": [
      "React Native Setup and Basics",
      "Building User Interfaces",
      "Navigation and State Management",
      "Publishing and Deployment",
    ],
    Marketing: [
      "Digital Marketing Fundamentals",
      "Search Engine Optimization",
      "Social Media Marketing",
      "Analytics and Optimization",
    ],
    Programming: [
      "Advanced JavaScript Concepts",
      "TypeScript Fundamentals",
      "Design Patterns and Architecture",
      "Testing and Performance",
    ],
  };
  return titles[category][chapterIndex - 1] || `Chapter ${chapterIndex}`;
}

function getLessonTitle(category, chapterIndex, lessonIndex) {
  const lessons = {
    "Web Development": {
      1: ["HTML5 Fundamentals", "CSS3 Styling", "Responsive Design"],
      2: ["JavaScript Basics", "DOM Manipulation", "ES6+ Features"],
      3: ["Node.js Introduction", "Express.js Framework", "RESTful APIs"],
      4: ["React Basics", "State Management", "Full-Stack Project"],
    },
    "Data Science": {
      1: ["Python Syntax", "Data Types and Structures", "Control Flow"],
      2: ["Pandas Introduction", "Data Cleaning", "Data Transformation"],
      3: ["Matplotlib Basics", "Seaborn Advanced", "Interactive Plots"],
      4: [
        "Scikit-learn Introduction",
        "Supervised Learning",
        "Model Evaluation",
      ],
    },
    "Mobile Development": {
      1: [
        "Environment Setup",
        "First React Native App",
        "Components and Props",
      ],
      2: ["Styling and Layout", "User Input", "Lists and Navigation"],
      3: ["React Navigation", "State Management", "API Integration"],
      4: ["Build Process", "App Store Guidelines", "Publishing Steps"],
    },
    Marketing: {
      1: ["Digital Marketing Overview", "Target Audience", "Marketing Funnel"],
      2: ["Keyword Research", "On-Page SEO", "Technical SEO"],
      3: ["Social Media Strategy", "Content Creation", "Community Management"],
      4: ["Google Analytics", "Conversion Tracking", "ROI Optimization"],
    },
    Programming: {
      1: [
        "Closures and Scope",
        "Prototypes and Inheritance",
        "Async Programming",
      ],
      2: [
        "TypeScript Setup",
        "Types and Interfaces",
        "Generics and Decorators",
      ],
      3: ["Singleton Pattern", "Observer Pattern", "Module Architecture"],
      4: ["Unit Testing", "Integration Testing", "Performance Optimization"],
    },
  };
  return (
    lessons[category]?.[chapterIndex]?.[lessonIndex - 1] ||
    `Lesson ${lessonIndex}`
  );
}

function getLessonContent(category, chapterIndex, lessonIndex) {
  return `
# ${getLessonTitle(category, chapterIndex, lessonIndex)}

## Overview
This lesson covers the fundamentals of ${getLessonTitle(category, chapterIndex, lessonIndex).toLowerCase()} as part of our comprehensive ${category.toLowerCase()} course.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the core concepts
- Apply practical techniques
- Solve real-world problems
- Prepare for the next lesson

## Content
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

### Key Points
- Important concept 1
- Important concept 2
- Important concept 3

### Practical Examples
Here are some practical examples to help you understand the concepts better.

## Summary
In this lesson, we covered the essential aspects of ${getLessonTitle(category, chapterIndex, lessonIndex).toLowerCase()}. Make sure to practice the exercises and review the key concepts before moving to the next lesson.
  `.trim();
}

function generateQuizQuestions(category, chapterIndex) {
  const questions = [
    {
      question: "What is the main focus of this chapter?",
      type: "multiple-choice",
      options: [
        "Basic concepts",
        "Advanced techniques",
        "Practical applications",
        "All of the above",
      ],
      correctAnswer: "All of the above",
      explanation:
        "This chapter covers basic concepts, advanced techniques, and practical applications.",
      points: 2,
    },
    {
      question:
        "The concepts learned in this chapter are important for professional development.",
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Yes, these concepts are fundamental for professional growth.",
      points: 1,
    },
    {
      question: "Which of the following best describes the learning approach?",
      type: "multiple-choice",
      options: [
        "Theory only",
        "Practice only",
        "Theory and practice combined",
        "Self-study only",
      ],
      correctAnswer: "Theory and practice combined",
      explanation:
        "The best approach combines both theoretical understanding and practical application.",
      points: 2,
    },
    {
      question: "This chapter builds upon previous knowledge.",
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Each chapter builds upon the knowledge from previous chapters.",
      points: 1,
    },
    {
      question: "What should you do after completing this chapter?",
      type: "multiple-choice",
      options: [
        "Move to the next chapter immediately",
        "Review and practice the concepts",
        "Skip the exercises",
        "Start a different course",
      ],
      correctAnswer: "Review and practice the concepts",
      explanation:
        "It's important to review and practice before moving forward.",
      points: 2,
    },
  ];

  return questions;
}

seedDatabase();
