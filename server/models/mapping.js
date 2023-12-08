import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const visitedSchema = new Schema({
  date: { type: Date },
});

const statusSchema = new Schema({
  blocked: { type: Boolean },
});

const userSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastVisit: visitedSchema,
  status: statusSchema,
});

const User = mongoose.model('User', userSchema);

export { User };
