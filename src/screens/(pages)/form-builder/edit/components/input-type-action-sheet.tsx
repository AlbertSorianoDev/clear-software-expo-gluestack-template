// import { DownloadIcon, EditIcon, EyeOffIcon, TrashIcon } from "@/components/ui/icon";
import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { InputTypeEnum } from "@/data/forms/types/enums";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/screens/components/ui/actionsheet";

export const InputTypeOptions = Object.entries(InputTypeEnum).map(([value, label]) => ({
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

        {InputTypeOptions.map((type) => (
          <ActionsheetItem key={type.value} onPress={handleClose}>
            <ActionsheetItemText>{type.label}</ActionsheetItemText>
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  );
};
