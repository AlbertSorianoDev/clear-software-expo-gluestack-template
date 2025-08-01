import { useEffect } from "react";

import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { usePutFormsId } from "@/data/forms/hooks/use-put-forms-id";
import { Form } from "@/data/forms/types/form";
import { useErrorToast } from "@/screens/hooks/use-error-toast";
import { useLoadingToast } from "@/screens/hooks/use-loading-toast";

export const useSetupFormUpdater = (form?: Form) => {
  const { mutateAsync: updateFormMutate } = usePutFormsId();
  const setOnChangeSelectedItemId = useEditFormBuilderPageStore((s) => s.setOnChangeSelectedItemId);

  const { showLoadingToast, closeLoadingToast } = useLoadingToast();
  const { showErrorToast } = useErrorToast();

  useEffect(() => {
    const handleUpdateFormSection = async () => {
      if (!form) return;

      showLoadingToast({ message: "Updating form." });

      try {
        const { form: formData, selectedItemId } = useEditFormBuilderPageStore.getState();

        if (selectedItemId == -1) {
          await updateFormMutate({
            id: form.id,
            body: {
              title: formData.title,
              description: formData.description,
            },
          });
        }

        closeLoadingToast();
      } catch {
        closeLoadingToast();
        showErrorToast({ message: "Error updating form." });
      }
    };

    setOnChangeSelectedItemId(handleUpdateFormSection);

    return () => {
      setOnChangeSelectedItemId(() => {});
    };
  }, [
    form,
    setOnChangeSelectedItemId,
    updateFormMutate,
    showLoadingToast,
    closeLoadingToast,
    showErrorToast,
  ]);
};
