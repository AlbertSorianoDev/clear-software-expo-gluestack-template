import { useMutation } from "@tanstack/react-query";

import { submitForm } from "../api/submit-form";
import { FieldResponse } from "../types/field-response";

export const useSubmitForm = () => {
  return useMutation<FieldResponse, Error, { formSubmissionId: number }>({
    mutationFn: ({ formSubmissionId }) => submitForm(formSubmissionId),
  });
};
