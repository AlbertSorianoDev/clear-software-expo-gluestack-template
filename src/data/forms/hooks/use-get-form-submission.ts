import { useQuery } from "@tanstack/react-query";

import { getFormSubmission } from "../api/get-form-submission";

export const useGetFormSubmission = (id: number) => {
  return useQuery({
    queryKey: ["form-submission", id],
    queryFn: () => getFormSubmission(id),
  });
};
