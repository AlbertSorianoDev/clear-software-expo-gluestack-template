import { useCallback } from "react";

import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { usePostFormsIdFields } from "@/data/forms/hooks/use-post-forms-id-fields";
import { InputTypeEnum } from "@/data/forms/types/enums";
import { Form } from "@/data/forms/types/form";
import { useErrorToast } from "@/screens/hooks/use-error-toast";
import { useLoadingToast } from "@/screens/hooks/use-loading-toast";

export const useNewFormField = (form: Form | undefined) => {
  const { mutateAsync: addNewFieldMutate } = usePostFormsIdFields();
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);

  const { showLoadingToast, closeLoadingToast } = useLoadingToast();
  const { showErrorToast } = useErrorToast();

  return useCallback(
    async (type: InputTypeEnum) => {
      if (!form) return;

      showLoadingToast({ message: "Adding form field." });

      setSelectedItemId(null);

      try {
        const selectedItemId = useEditFormBuilderPageStore.getState().selectedItemId;
        let orderAfter: number | undefined = undefined;

        if (selectedItemId != -1 && selectedItemId != null) {
          const field = useEditFormBuilderPageStore.getState().field;
          orderAfter = field.order;
        }

        await addNewFieldMutate({
          id: form.id,
          body: {
            inputType: type,
            afterFieldOrder: orderAfter,
          },
        });

        closeLoadingToast();
      } catch {
        closeLoadingToast();
        showErrorToast({ message: "Error adding form field." });
      }
    },
    [
      form,
      showLoadingToast,
      setSelectedItemId,
      closeLoadingToast,
      addNewFieldMutate,
      showErrorToast,
    ],
  );
};
