import { DateQuestion } from "./date-question";
import { DropdownQuestion } from "./dropdown-question";
import { LinearScaleQuestion } from "./linear-scale-question";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { SingleChoiceQuestion } from "./single-choice-question";
import { SliderQuestion } from "./slider-question";
import { TextQuestion } from "./text-question";
import { TimeQuestion } from "./time-question";
import { UploadFileQuestion } from "./upload-file-question";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { Text } from "@/screens/components/ui/text";

export const RenderQuestion = ({ id, type }: { id: number; type: InputTypeEnum }) => {
  switch (type) {
    case InputTypeEnum.shortText:
      return <TextQuestion id={id} type={type} />;

    case InputTypeEnum.longText:
      return <TextQuestion id={id} type={type} />;

    case InputTypeEnum.singleChoice:
      return <SingleChoiceQuestion id={id} />;

    case InputTypeEnum.multipleChoice:
      return <MultipleChoiceQuestion id={id} />;

    case InputTypeEnum.linearScale:
      return <LinearScaleQuestion id={id} />;

    case InputTypeEnum.slider:
      return <SliderQuestion id={id} />;

    case InputTypeEnum.dropdown:
      return <DropdownQuestion id={id} />;

    case InputTypeEnum.fileUpload:
      return <UploadFileQuestion id={id} />;

    case InputTypeEnum.date:
      return <DateQuestion id={id} />;

    case InputTypeEnum.time:
      return <TimeQuestion id={id} />;

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
