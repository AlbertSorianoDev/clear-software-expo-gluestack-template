import { useLocalSearchParams } from "expo-router";

export const useParsedSearchParams = () => {
  const { id, submissionId } = useLocalSearchParams<{
    id?: string;
    submissionId?: string;
  }>();

  return {
    formId: id ? Number(id) : undefined,
    submissionId: submissionId ? Number(submissionId) : undefined,
  };
};
