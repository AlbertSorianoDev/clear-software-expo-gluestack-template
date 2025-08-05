import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postFormsIdFields } from "../api/post-forms-id-fields";
import { Form } from "../types/form";
import { FormFieldCreate } from "../types/form-field";

export const usePostFormsIdFields = () => {
  const queryClient = useQueryClient();

  return useMutation<Form, Error, { id: number; body: FormFieldCreate }>({
    mutationFn: ({ id, body }) => postFormsIdFields(id, body),
    onSuccess: (data: Form) => {
      queryClient.setQueryData(["forms", data.id], data);
    },
  });
};
