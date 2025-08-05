import { FieldResponse } from "./field-response";

export interface FormSubmission {
  id: number;
  createdAt: number;
  formId: string;
  userId: number;
  isSubmitted: boolean;
  responses: FieldResponse[];
}
