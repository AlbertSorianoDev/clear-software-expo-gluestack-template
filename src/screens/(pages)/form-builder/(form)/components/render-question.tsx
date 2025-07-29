import { DateQuestion } from "./date-question";
import { DropdownQuestion } from "./dropdown-question";
import { LinearScaleQuestion } from "./linear-scale-question";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { SingleChoiceQuestion } from "./single-choice-question";
import { ShortTextQuestion } from "./text-question";
import { TimeQuestion } from "./time-question";
import { UploadFileQuestion } from "./upload-file-question";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { Text } from "@/screens/components/ui/text";

export const RenderQuestion = ({ type }: { type: InputTypeEnum }) => {
  switch (type) {
    case InputTypeEnum.shortText:
      return <ShortTextQuestion type={type} />;

    case InputTypeEnum.longText:
      return <ShortTextQuestion type={type} />;

    case InputTypeEnum.singleChoice:
      return <SingleChoiceQuestion />;

    case InputTypeEnum.multipleChoice:
      return <MultipleChoiceQuestion />;

    case InputTypeEnum.linearScale:
      return <LinearScaleQuestion />;

    case InputTypeEnum.dropdown:
      return <DropdownQuestion />;

    case InputTypeEnum.fileUpload:
      return <UploadFileQuestion />;

    case InputTypeEnum.date:
      return <DateQuestion />;

    case InputTypeEnum.time:
      return <TimeQuestion />;

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
