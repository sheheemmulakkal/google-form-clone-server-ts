import mongoose, { Model, Document } from "mongoose";
import { FormType, FieldType } from "../common/types/Form";

interface FormModel extends Model<FormType> {
  build(attrs: FormType): FormDoc;
}

interface FormDoc extends Document {
  _id: string;
  title: string;
  description: string;
  admin: string;
  responses?: string[];
  fields: FieldType[];
}

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
  fields: [
    {
      type: {
        type: String,
      },
      required: {
        type: Boolean,
      },
      label: {
        type: String,
      },
      options: [{ type: String }],
    },
  ],
});

formSchema.statics.build = (form: FormType) => {
  return new Form(form);
};

const Form = mongoose.model<FormDoc, FormModel>("form", formSchema);

export { Form };
