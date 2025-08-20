import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description: string;
  lessonId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  questions: {
    id: string;
    type: 'multiple-choice' | 'true-false' | 'text';
    question: string;
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    points: number;
  }[];
  passingScore: number;
  timeLimit: number; // in minutes, 0 for no limit
  maxAttempts: number; // 0 for unlimited
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{
    id: { type: String, required: true },
    type: { type: String, enum: ['multiple-choice', 'true-false', 'text'], required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: Schema.Types.Mixed, required: true },
    explanation: { type: String, default: '' },
    points: { type: Number, default: 1 }
  }],
  passingScore: { type: Number, default: 70 },
  timeLimit: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Add indexes
QuizSchema.index({ lessonId: 1 });
QuizSchema.index({ courseId: 1 });

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
