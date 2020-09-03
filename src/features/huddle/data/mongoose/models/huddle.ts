import mongoose from 'mongoose';

export interface Huddle {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HuddleDoc extends mongoose.Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: 'huddles',
    timestamps: true,
  }
);

export const HuddleModel: mongoose.Model<HuddleDoc> = mongoose.model<HuddleDoc>('HuddleModel', schema);
