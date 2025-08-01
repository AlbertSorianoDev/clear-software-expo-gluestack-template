import { Circle } from "lucide-react-native";
import { useEffect, useState } from "react";

import { useQuestionContext } from "../hooks/use-question-context";

import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const SingleChoiceQuestion = ({ id }: { id: number }) => {
  const { submission, options, isLoading } = useQuestionContext(id);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (submission?.optionResponse?.fieldOptionIds.length) {
      setValue(submission.optionResponse.fieldOptionIds[0].toString());
    }
  }, [submission?.optionResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md">
      <RadioGroup value={value} onChange={setValue}>
        {options
          ?.sort((a, b) => a.order - b.order)
          .map((option, index) => (
            <Radio value={option.id.toString()} size="sm" key={index}>
              <RadioIndicator>
                <RadioIcon as={Circle} />
              </RadioIndicator>
              <RadioLabel>{option.label}</RadioLabel>
            </Radio>
          ))}
      </RadioGroup>
    </VStack>
  );
};
