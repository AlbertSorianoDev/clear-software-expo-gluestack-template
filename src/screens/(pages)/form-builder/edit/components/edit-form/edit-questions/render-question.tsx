import { EditDateQuestion } from "./edit-date";
import { EditDropdownQuestion } from "./edit-dropdown";
import { EditFileUploadQuestion } from "./edit-file-upload";
import { EditLinearScaleQuestion } from "./edit-linear-scale";
import { EditLongTextQuestion } from "./edit-long-text";
import { EditMultipleChoiceQuestion } from "./edit-multiple-choice";
import { EditShortTextQuestion } from "./edit-short-text";
import { EditSingleChoiceQuestion } from "./edit-single-choice";
import { EditTimeQuestion } from "./edit-time";

import { Text } from "@/screens/components/ui/text";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const RenderEditQuestion = (type: FormInputTypeEnum) => {
  switch (type) {
    case FormInputTypeEnum.shortText:
      return <EditShortTextQuestion />;

    case FormInputTypeEnum.longText:
      return <EditLongTextQuestion />;

    case FormInputTypeEnum.singleChoice:
      return <EditSingleChoiceQuestion />;

    case FormInputTypeEnum.multipleChoice:
      return <EditMultipleChoiceQuestion />;

    case FormInputTypeEnum.dropdown:
      return <EditDropdownQuestion />;

    case FormInputTypeEnum.linearScale:
      return <EditLinearScaleQuestion />;

    case FormInputTypeEnum.fileUpload:
      return <EditFileUploadQuestion />;

    case FormInputTypeEnum.date:
      return <EditDateQuestion />;

    case FormInputTypeEnum.time:
      return <EditTimeQuestion />;

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
