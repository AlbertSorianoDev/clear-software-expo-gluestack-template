import { useMemo } from "react";

import { useParsedSearchParams } from "./use-parsed-submission-page-params";
import { useSubmissionByField } from "./use-submission-by-field";

import { useGetFormsId } from "@/data/forms/hooks/use-get-forms-id";

export const useQuestionContext = (fieldId: number) => {
  const { formId, submissionId } = useParsedSearchParams();
  const { data: formData } = useGetFormsId(formId ?? 0);
  const { fieldSubmission, isLoading } = useSubmissionByField(fieldId, submissionId);

  const options = useMemo(() => {
    return formData?.fields?.find((f) => f.id === fieldId)?.options ?? [];
  }, [formData, fieldId]);

  return { options, fieldSubmission, isLoading };
};
