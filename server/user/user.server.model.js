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
  isVerified: { type: Boolean, required: true, default: false },
  created_at: Date,
  updated_at: Date
});

UserSchema.statics = {
  saveUser(requestData, callback) {
    this.create(requestData, callback);
  },
  findUserUpdate(query, user, callback) {
    this.findOneAndUpdate(query, user, callback);
  },
  updateUser(user, callback) {
    user.save(callback);
  },

  findUser(username, callback) {
    this.findOne({ username }, callback);
  },

  findUserByIdAndUserName(id, username, callback) {
    this.findOne({ username, _id: id }, callback);
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
