import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uid: String,
  username: String,
  email: String,
});
