import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postForms } from "../api/post-forms";
import { Form } from "../types/form";

export const usePostForms = () => {
  const queryClient = useQueryClient();

  return useMutation<Form, Error>({
    mutationFn: () => postForms(),
    onSuccess: async (data: Form) => {
      queryClient.setQueryData(["forms", data.id], data);
      await queryClient.invalidateQueries({ queryKey: ["forms"], exact: true });
    },
  });
};
