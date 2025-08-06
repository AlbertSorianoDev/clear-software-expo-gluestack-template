import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFieldOrder } from "../api/patch-field-order";
import { Form } from "../types/form";

export const useUpdateFieldOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Form, Error, { formId: number; fieldId: number; toOrder: number }>({
    mutationFn: ({ formId, fieldId, toOrder }) => updateFieldOrder(formId, fieldId, toOrder),
    onSuccess: async (data: Form) => {
      queryClient.setQueryData(["forms", data.id], data);
      await queryClient.invalidateQueries({ queryKey: ["forms"], exact: true });
    },
  });
};
