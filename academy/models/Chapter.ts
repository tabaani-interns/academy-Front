import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  title: string;
  description: string;
  courseId: mongoose.Types.ObjectId;
  orderIndex: number;
  totalLessons: number;
  totalDuration: number; // in minutes
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  orderIndex: { type: Number, required: true },
  totalLessons: { type: Number, default: 0 },
  totalDuration: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Add indexes
ChapterSchema.index({ courseId: 1, orderIndex: 1 });

export default mongoose.models.Chapter || mongoose.model<IChapter>('Chapter', ChapterSchema);
