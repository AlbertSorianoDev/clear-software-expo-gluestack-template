import { useMemo } from "react";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";

export const useSubmissionByField = (fieldId: number, submissionId?: number) => {
  const { data, isLoading } = useGetFormSubmission(submissionId ?? 0);
  const fieldSubmission = useMemo(() => {
    return data?.responses?.find((r) => r.formFieldId === fieldId);
  }, [data?.responses, fieldId]);
  return { fieldSubmission, isLoading };
};
