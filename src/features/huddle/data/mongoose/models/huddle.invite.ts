import mongoose from 'mongoose';

export interface HuddleInvite {
  _id: string;
  email: string;
  huddleId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HuddleInviteDoc extends mongoose.Document {
  email: string;
  huddleId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    huddleId: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    collection: 'huddleInvites',
    timestamps: true,
  }
);

export const HuddleInviteModel: mongoose.Model<HuddleInviteDoc> = mongoose.model<HuddleInviteDoc>('HuddleInviteModel', schema);
