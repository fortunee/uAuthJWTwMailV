import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/uauthn');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
