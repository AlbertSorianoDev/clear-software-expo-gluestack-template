import { useMemo } from "react";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";

export const useSubmissionByField = (fieldId: number, submissionId?: number) => {
  const { data, isLoading } = useGetFormSubmission(submissionId ?? 0);
  const submission = useMemo(
    () => data?.responses?.find((r) => r.formFieldId === fieldId),
    [data, fieldId],
  );
  return { submission, isLoading };
};
