import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putFormsId } from "../api/put-forms-id";
import { Form, FormUpdate } from "../types/form";

export const usePutFormsId = () => {
  const queryClient = useQueryClient();

  return useMutation<Form, Error, { id: number; body: FormUpdate }>({
    mutationFn: ({ id, body }) => putFormsId(id, body),
    onSuccess: async (data: Form) => {
      queryClient.setQueryData(["forms", data.id], data);
      await queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
};
