// import { DownloadIcon, EditIcon, EyeOffIcon, TrashIcon } from "@/components/ui/icon";
import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/screens/components/ui/actionsheet";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const FormInputTypeOptions = Object.entries(FormInputTypeEnum).map(([value, label]) => ({
  value,
  label,
}));

export const InputTypeActionSheet = () => {
  const showInputTypeActionSheet = useEditFormBuilderPageStore(
    (state) => state.showInputTypeActionSheet,
  );
  const setShowInputTypeActionSheet = useEditFormBuilderPageStore(
    (state) => state.setShowInputTypeActionSheet,
  );

  const handleClose = () => {
    setShowInputTypeActionSheet(false);
  };
  return (
    <Actionsheet isOpen={showInputTypeActionSheet} onClose={handleClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {FormInputTypeOptions.map((type) => (
          <ActionsheetItem key={type.value} onPress={handleClose}>
            <ActionsheetItemText>{type.label}</ActionsheetItemText>
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  );
};
