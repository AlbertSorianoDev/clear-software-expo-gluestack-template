import { CalendarDays, CheckIcon, Circle, Clock } from "lucide-react-native";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { FieldOption } from "@/data/forms/types/field-option";
import { FileField, SliderField } from "@/data/forms/types/form-field";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/screens/components/ui/checkbox";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { formatSnakeCase } from "@/screens/utils/format-snake-case";

export const RenderPreviewQuestion = ({
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
      return (
        <Input variant="underlined" className="w-1/2" isDisabled>
          <InputField placeholder="Short answer text" />
        </Input>
      );

    case InputTypeEnum.longText:
      return (
        <Input variant="underlined" className="w-1/2" isDisabled>
          <InputField placeholder="Long answer text" />
        </Input>
      );

    case InputTypeEnum.singleChoice:
      return (
        <VStack space="md">
          <RadioGroup>
            <Radio value="change" size="sm" isInvalid={false} isDisabled={false}>
              <RadioIndicator>
                <RadioIcon as={Circle} />
              </RadioIndicator>
              <RadioLabel>Label</RadioLabel>
            </Radio>
            <Radio value="change" size="sm" isInvalid={false} isDisabled={false}>
              <RadioIndicator>
                <RadioIcon as={Circle} />
              </RadioIndicator>
              <RadioLabel>Label</RadioLabel>
            </Radio>
          </RadioGroup>
        </VStack>
      );

    case InputTypeEnum.multipleChoice:
      return (
        <VStack space="md">
          <CheckboxGroup value={["values"]}>
            <VStack space="md">
              {Array.from({ length: 2 }).map((_, index) => (
                <Checkbox value="Eng" size="sm" key={index}>
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{`Item ${index}`}</CheckboxLabel>
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        </VStack>
      );

    case InputTypeEnum.linearScale:
      return (
        <Box className="flex flex-col gap-2 md:flex-row md:items-end">
          <Text className="md:mx-4">Min</Text>
          <Box className="ml-8 flex-1 flex-col md:ml-0 md:flex-row md:justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
              <Box className="flex-row items-center gap-2 md:flex-col" key={index}>
                <Text>{index + 1}</Text>
                <Icon as={Circle} />
              </Box>
            ))}
          </Box>
          <Text className="md:mx-4">Max</Text>
        </Box>
      );

    case InputTypeEnum.dropdown:
      return (
        <VStack space="md">
          {Array.from({ length: 2 }).map((_, index) => (
            <HStack className="items-center" space="md" key={index}>
              <Text>{`${index + 1}.`}</Text>
              <Text>{`Option ${index + 1}`}</Text>
            </HStack>
          ))}
        </VStack>
      );

    case InputTypeEnum.fileUpload:
      return (
        <HStack space="lg" className="items-center">
          <Button size="sm" isDisabled className="w-fit">
            <ButtonText>Add file</ButtonText>
          </Button>
          <Text className="text-typography-500">
            {formatSnakeCase(file.fileType)} file type - {file.filesLimit} files
          </Text>
        </HStack>
      );

    case InputTypeEnum.date:
      return (
        <Input className="w-fit" isDisabled>
          <InputField placeholder="__ / __ / __" className="w-fit" readOnly />

          <InputIcon as={CalendarDays} className="mr-4" />
        </Input>
      );

    case InputTypeEnum.time:
      return (
        <Input className="w-fit" isDisabled>
          <InputField placeholder="-- / --" className="w-fit" readOnly />

          <InputIcon as={Clock} className="mr-4" />
        </Input>
      );

    default:
      return <Text className="text-red-500">Unknown form input type</Text>;
  }
};
