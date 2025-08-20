import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrollmentDate: Date;
  completionDate?: Date;
  progress: number; // 0-100
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  paymentStatus: 'free' | 'paid' | 'pending';
  paymentAmount: number;
  lastAccessedDate: Date;
  certificateIssued: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  completionDate: { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['active', 'completed', 'paused', 'cancelled'], default: 'active' },
  paymentStatus: { type: String, enum: ['free', 'paid', 'pending'], default: 'free' },
  paymentAmount: { type: Number, default: 0 },
  lastAccessedDate: { type: Date, default: Date.now },
  certificateIssued: { type: Boolean, default: false },
}, {
  timestamps: true
});

// Add compound index to prevent duplicate enrollments
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
EnrollmentSchema.index({ userId: 1 });
EnrollmentSchema.index({ courseId: 1 });

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
