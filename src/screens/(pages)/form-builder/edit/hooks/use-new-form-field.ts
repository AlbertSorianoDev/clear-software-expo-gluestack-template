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

      try {
        const selectedItemId = useEditFormBuilderPageStore.getState().selectedItemId;
        const field = useEditFormBuilderPageStore.getState().field;

        let orderAfter: number | undefined = undefined;

        console.log("selectedItemId", selectedItemId);
        console.log("field", field);

        if (selectedItemId !== -1 && selectedItemId !== undefined) {
          orderAfter = field.order;
          console.log("orderAfter", orderAfter);
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

      setSelectedItemId(null);
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
