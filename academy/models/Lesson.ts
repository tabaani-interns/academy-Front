import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  videoDuration: number; // in seconds
  orderIndex: number;
  chapterId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  isPreview: boolean;
  isPublished: boolean;
  resources: {
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'download';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  videoDuration: { type: Number, default: 0 },
  orderIndex: { type: Number, required: true },
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  type: { type: String, enum: ['video', 'text', 'quiz', 'assignment'], default: 'video' },
  isPreview: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  resources: [{
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['pdf', 'link', 'download'], required: true }
  }],
}, {
  timestamps: true
});

// Add indexes
LessonSchema.index({ courseId: 1, chapterId: 1, orderIndex: 1 });

export default mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);
