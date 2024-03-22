import mongoose, { Model, Document } from "mongoose";
import { User } from "../common/types/User";

interface UserModel extends Model<User> {
  build(attrs: User): UserDoc;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (user: User) => {
  return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
