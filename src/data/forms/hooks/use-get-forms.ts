import { useQuery } from "@tanstack/react-query";

import { getForms } from "../api/get-forms";

export const useGetForms = () => {
  return useQuery({
    queryKey: ["forms"],
    queryFn: () => getForms(),
  });
};
