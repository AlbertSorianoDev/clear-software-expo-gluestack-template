import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFormFieldResponse } from "../api/update-form-field-response";
import { FieldResponse, FieldResponseUpdate } from "../types/field-response";

export const useUpdateFormFieldResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<FieldResponse, Error, { fieldResponseId: number; body: FieldResponseUpdate }>({
    mutationFn: ({ fieldResponseId, body }) => updateFormFieldResponse(fieldResponseId, body),
    onSuccess: async (data: FieldResponse) => {
      // queryClient.setQueryData(["forms", data.id], data);
    },
  });
};
