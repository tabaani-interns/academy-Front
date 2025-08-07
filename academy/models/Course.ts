import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  language: string;
  duration: number; // in minutes
  totalLessons: number;
  status: 'draft' | 'published' | 'archived';
  tutorId: mongoose.Types.ObjectId;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
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
  tutorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  enrollmentCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  whatYouWillLearn: [{ type: String }],
  requirements: [{ type: String }],
  targetAudience: [{ type: String }],
}, {
  timestamps: true
});

// Add indexes for better query performance
CourseSchema.index({ title: 'text', description: 'text', category: 'text' });
CourseSchema.index({ category: 1, level: 1, price: 1 });
CourseSchema.index({ tutorId: 1 });
CourseSchema.index({ status: 1 });

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
