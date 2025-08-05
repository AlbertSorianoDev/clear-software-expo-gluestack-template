// import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postFormFieldResponse } from "../api/post-form-field-response";
import { FieldResponse, FieldResponseCreate } from "../types/field-response";
import { FormSubmission } from "../types/form-submission";

export const usePostFormFieldResponse = () => {
  const queryClient = useQueryClient();

  return useMutation<FieldResponse, Error, { formSubmissionId: number; body: FieldResponseCreate }>(
    {
      mutationFn: ({ formSubmissionId, body }) => postFormFieldResponse(formSubmissionId, body),

      onSuccess: async (updatedResponse, variables) => {
        const submissionId = variables.formSubmissionId;

        queryClient.setQueryData<FormSubmission>(["form-submission", submissionId], (prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            responses: (() => {
              const exists = prev.responses.some(
                (resp) => resp.formFieldId === updatedResponse.formFieldId,
              );

              if (exists) {
                return prev.responses.map((resp) =>
                  resp.formFieldId === updatedResponse.formFieldId ? updatedResponse : resp,
                );
              } else {
                return [...prev.responses, updatedResponse];
              }
            })(),
          };
        });
      },
    },
  );
};
