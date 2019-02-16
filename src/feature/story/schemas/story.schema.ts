import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
  title: String,
  content: String,
});
