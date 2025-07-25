import { DropdownQuestion } from "./dropdown-question";
import { LinearScaleQuestion } from "./linear-scale-question";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { SingleChoiceQuestion } from "./single-choice-question";
import { ShortTextQuestion } from "./text-question";

import { Button, ButtonText } from "@/screens/components/ui/button";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const RenderQuestion = ({ type }: { type: FormInputTypeEnum }) => {
  switch (type) {
    case FormInputTypeEnum.shortText:
      return <ShortTextQuestion type={type} />;

    case FormInputTypeEnum.longText:
      return <ShortTextQuestion type={type} />;

    case FormInputTypeEnum.singleChoice:
      return <SingleChoiceQuestion />;

    case FormInputTypeEnum.multipleChoice:
      return <MultipleChoiceQuestion />;

    case FormInputTypeEnum.linearScale:
      return <LinearScaleQuestion />;

    case FormInputTypeEnum.dropdown:
      return <DropdownQuestion />;

    case FormInputTypeEnum.fileUpload:
      return (
        <VStack space="md">
          <Button size="sm" isDisabled className="w-fit">
            <ButtonText>Add file</ButtonText>
          </Button>
        </VStack>
      );

    // case FormInputTypeEnum.date:
    //   return <EditDateQuestion />;

    // case FormInputTypeEnum.time:
    //   return <EditTimeQuestion />;

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
