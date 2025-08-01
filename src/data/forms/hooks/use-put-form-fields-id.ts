import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putFormFieldsId } from "../api/put-form-fields-id";
import { Form } from "../types/form";
import { FormField, FormFieldUpdate } from "../types/form-field";

export const usePutFormFieldsId = () => {
  const queryClient = useQueryClient();

  return useMutation<FormField, Error, { id: number; body: FormFieldUpdate }>({
    mutationFn: ({ id, body }) => putFormFieldsId(id, body),
    onSuccess: (updatedField) => {
      queryClient.setQueryData<Form | undefined>(["forms", updatedField.formId], (prevForm) => {
        if (!prevForm) return prevForm;

        const updatedFields = prevForm.fields?.map((field) =>
          field.id === updatedField.id ? updatedField : field,
        );

        return {
          ...prevForm,
          fields: updatedFields,
        };
      });
    },
  });
};
