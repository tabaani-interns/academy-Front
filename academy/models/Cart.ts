import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    courseId: mongoose.Types.ObjectId;
    price: number;
    addedAt: Date;
  }[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
  }],
  totalAmount: { type: Number, default: 0 },
}, {
  timestamps: true
});

// Add indexes
CartSchema.index({ userId: 1 });

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
