import { useQuery } from "@tanstack/react-query";

import { getFormsId } from "../api/get-forms-id";

export const useGetFormsId = (id: number) => {
  return useQuery({
    queryKey: ["forms", id],
    queryFn: () => getFormsId(id),
  });
};
