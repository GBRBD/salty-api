import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
  title: { type: String, min: 3, max: 140, required: true },
  content: { type: String, min: 3, max: 10000, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  uid: { type: String, required: true },
  username: { type: String },
  comments: [
    {
      commentUid: String,
      comment: String,
      date: Date,
      username: String,
    },
  ],
});
