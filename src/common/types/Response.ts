export interface Response {
  _id: string;
  formId: string;
  answers: {
    label: string;
    type: string;
    anwer: string | string[];
  }[];
}
