import mongoose, { Model, Document } from "mongoose";
import { Response } from "../common/types/Response";

interface ResponseModel extends Model<Response> {
  build(attrs: Response): ResponseDoc;
}

interface ResponseDoc extends Document {
  formId: string;
  answers: {
    label: string;
    type: string;
    anwer: string | string[];
  }[];
}

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answrers: [
    {
      label: {
        type: String,
      },
      type: {
        type: String,
      },
      answers: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
  ],
});

responseSchema.statics.build = (response: Response) => {
  return new ResponseModel(response);
};

const ResponseModel = mongoose.model<ResponseDoc, ResponseModel>(
  "response",
  responseSchema
);

export { ResponseModel };
