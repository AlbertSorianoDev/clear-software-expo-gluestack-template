import { CheckIcon, Circle } from "lucide-react-native";

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
import { Input, InputField } from "@/screens/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const RenderPreviewQuestion = ({ type }: { type: FormInputTypeEnum }) => {
  switch (type) {
    case FormInputTypeEnum.shortText:
      return (
        <Input variant="underlined" className="w-1/2" isDisabled>
          <InputField placeholder="Short answer text" />
        </Input>
      );

    case FormInputTypeEnum.longText:
      return (
        <Input variant="underlined" className="w-1/2" isDisabled>
          <InputField placeholder="Long answer text" />
        </Input>
      );

    case FormInputTypeEnum.singleChoice:
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

    case FormInputTypeEnum.multipleChoice:
      return (
        <VStack space="md">
          <CheckboxGroup
            value={["values"]}
            // onChange={(keys) => {
            //   setValues(keys);
            // }}
          >
            <VStack space="md">
              {Array.from({ length: 2 }).map((_, index) => (
                <Checkbox value="Eng" size="sm">
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

    case FormInputTypeEnum.linearScale:
      return (
        <Box className="flex flex-col gap-2 md:flex-row md:items-end">
          <Text className="md:mx-4">asdsadsa</Text>
          <Box className="ml-8 flex-1 flex-col md:ml-0 md:flex-row md:justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
              <Box className="flex-row items-center gap-2 md:flex-col">
                <Text>{index + 1}</Text>
                <Icon as={Circle} />
              </Box>
            ))}
          </Box>
          <Text className="md:mx-4">asdsadsa</Text>
        </Box>
      );

    case FormInputTypeEnum.dropdown:
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
