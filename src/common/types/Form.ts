export interface FieldType {
  type: string;
  options: string[];
  required: boolean;
  label: string;
}

export interface FormType {
  _id: string;
  title: string;
  admin: string;
  description: string;
  responses?: string[];
  fields: FieldType[];
}
