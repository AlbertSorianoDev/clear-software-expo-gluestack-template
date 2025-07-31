import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFormsId } from "../api/delete-forms-id";

export const useDeleteFormsId = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, number>({
    mutationFn: deleteFormsId,
    onSuccess: async (_data, id) => {
      await queryClient.invalidateQueries({ queryKey: ["forms", id] });
      await queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
};
