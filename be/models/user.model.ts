import mongoose from 'mongoose';

const useSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
const User = mongoose.model('User', useSchema);
export default User;