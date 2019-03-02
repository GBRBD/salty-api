import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  uid: String,
});
