import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;  // Optional for OAuth users
  image?: string;
  role: 'student' | 'tutor' | 'admin';
  githubId?: string;  // Optional for email/password users
  enrolledCourses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String }, // Optional for OAuth users
  image: { type: String },
  role: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  githubId: { type: String }, // Optional for email/password users
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
