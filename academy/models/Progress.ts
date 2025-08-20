import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  chapterId: mongoose.Types.ObjectId;
  isCompleted: boolean;
  completionDate?: Date;
  watchTime: number; // in seconds for videos
  lastWatchedPosition: number; // in seconds for videos
  attempts: number;
  score?: number; // for quizzes
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  isCompleted: { type: Boolean, default: false },
  completionDate: { type: Date },
  watchTime: { type: Number, default: 0 },
  lastWatchedPosition: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  score: { type: Number, min: 0, max: 100 },
  notes: { type: String, default: '' },
}, {
  timestamps: true
});

// Add compound index to prevent duplicates and improve queries
ProgressSchema.index({ userId: 1, courseId: 1, lessonId: 1 }, { unique: true });
ProgressSchema.index({ userId: 1, courseId: 1 });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
