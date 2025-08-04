import { FormSubmissionResponse } from "./form-submission-response";

export interface FormSubmission {
  id: number;
  createdAt: number;
  formId: string;
  userId: number;
  isSubmitted: boolean;
  responses: FormSubmissionResponse[];
}
