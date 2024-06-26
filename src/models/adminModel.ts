import mongoose, { Model, Document } from "mongoose";
import { AdminType } from "../common/types/Admin";

interface AdminModel extends Model<AdminType> {
  build(attrs: AdminType): AdminDoc;
}

interface AdminDoc extends Document {
  email: string;
  password: string;
}

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.statics.build = (admin: AdminType) => {
  return new Admin(admin);
};

const Admin = mongoose.model<AdminDoc, AdminModel>("admin", adminSchema);

export { Admin };
