import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFormFieldResponse } from "../api/update-form-field-response";
import {
  FormSubmissionFieldResponseUpdate,
  FormSubmissionResponse,
} from "../types/form-submission-response";

export const useUpdateFormFieldResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<
    FormSubmissionResponse,
    Error,
    { fieldResponseId: number; body: FormSubmissionFieldResponseUpdate }
  >({
    mutationFn: ({ fieldResponseId, body }) => updateFormFieldResponse(fieldResponseId, body),
    onSuccess: async (data: FormSubmissionResponse) => {
      // queryClient.setQueryData(["forms", data.id], data);
    },
  });
};
