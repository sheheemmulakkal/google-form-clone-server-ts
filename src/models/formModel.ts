import mongoose, { Model, Document } from "mongoose";
import { FormType } from "../common/types/Form";

interface AdminModel extends Model<FormType> {
  build(attrs: FormType): AdminDoc;
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

adminSchema.statics.build = (admin: FormType) => {
  return new Admin(admin);
};

const Admin = mongoose.model<AdminDoc, AdminModel>("admin", adminSchema);

export { Admin };
