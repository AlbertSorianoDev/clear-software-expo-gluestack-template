import { useMutation } from "@tanstack/react-query";

import { submitForm } from "../api/submit-form";
import { FormSubmissionResponse } from "../types/form-submission-response";

export const useSubmitForm = () => {
  return useMutation<FormSubmissionResponse, Error, { formSubmissionId: number }>({
    mutationFn: ({ formSubmissionId }) => submitForm(formSubmissionId),
  });
};
