import { EditDateQuestion } from "./edit-date";
import { EditDropdownQuestion } from "./edit-dropdown";
import { EditFileUploadQuestion } from "./edit-file-upload";
import { EditLinearScaleQuestion } from "./edit-linear-scale";
import { EditLongTextQuestion } from "./edit-long-text";
import { EditMultipleChoiceQuestion } from "./edit-multiple-choice";
import { EditShortTextQuestion } from "./edit-short-text";
import { EditSingleChoiceQuestion } from "./edit-single-choice";
import { EditTimeQuestion } from "./edit-time";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { FieldOption } from "@/data/forms/types/field-option";
import { FileField, SliderField } from "@/data/forms/types/form-field";
import { Text } from "@/screens/components/ui/text";

export const RenderEditQuestion = ({
  type,
  options,
  slider,
  file,
}: {
  type: InputTypeEnum;
  options: FieldOption[];
  slider: SliderField;
  file: FileField;
}) => {
  switch (type) {
    case InputTypeEnum.shortText:
      return <EditShortTextQuestion />;

    case InputTypeEnum.longText:
      return <EditLongTextQuestion />;

    case InputTypeEnum.singleChoice:
      return <EditSingleChoiceQuestion />;

    case InputTypeEnum.multipleChoice:
      return <EditMultipleChoiceQuestion />;

    case InputTypeEnum.dropdown:
      return <EditDropdownQuestion />;

    case InputTypeEnum.linearScale:
      return <EditLinearScaleQuestion />;

    case InputTypeEnum.fileUpload:
      return <EditFileUploadQuestion fileType={file.fileType} filesLimit={file.filesLimit} />;

    case InputTypeEnum.date:
      return <EditDateQuestion />;

    case InputTypeEnum.time:
      return <EditTimeQuestion />;

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
