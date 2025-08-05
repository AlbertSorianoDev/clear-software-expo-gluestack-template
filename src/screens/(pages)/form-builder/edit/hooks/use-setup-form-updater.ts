import { useEffect } from "react";

import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { usePutFormFieldsId } from "@/data/forms/hooks/use-put-form-fields-id";
import { usePutFormsId } from "@/data/forms/hooks/use-put-forms-id";
import { Form } from "@/data/forms/types/form";
import { useErrorToast } from "@/screens/hooks/use-error-toast";
import { useLoadingToast } from "@/screens/hooks/use-loading-toast";

export const useSetupFormUpdater = (form?: Form) => {
  const { mutateAsync: updateFormMutate } = usePutFormsId();
  const { mutateAsync: updatedFormFieldMutate } = usePutFormFieldsId();
  const setOnChangeSelectedItemId = useEditFormBuilderPageStore((s) => s.setOnChangeSelectedItemId);

  const { showLoadingToast, closeLoadingToast } = useLoadingToast();
  const { showErrorToast } = useErrorToast();

  useEffect(() => {
    const handleUpdateFormSection = async () => {
      if (!form) return;

      showLoadingToast({ message: "Updating form." });

      try {
        const {
          form: formData,
          selectedItemId,
          field: fieldData,
        } = useEditFormBuilderPageStore.getState();

        if (selectedItemId == -1) {
          await updateFormMutate({
            id: form.id,
            body: {
              title: formData.title,
              description: formData.description,
            },
          });
        } else if (selectedItemId && fieldData.id) {
          await updatedFormFieldMutate({
            id: fieldData.id,
            body: {
              title: fieldData.title,
              description: fieldData.description,
              isRequired: fieldData.isRequired,
              min: fieldData.slider?.min,
              max: fieldData.slider?.max,
              step: fieldData.slider?.step,
              fileType: fieldData.file?.fileType,
              filesLimit: fieldData.file?.filesLimit,
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
    updatedFormFieldMutate,
    showLoadingToast,
    closeLoadingToast,
    showErrorToast,
  ]);
};
