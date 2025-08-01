import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";

import { useQuestionContext } from "../hooks/use-question-context";

import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/screens/components/ui/checkbox";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const MultipleChoiceQuestion = ({ id }: { id: number }) => {
  const { submission, options, isLoading } = useQuestionContext(id);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (submission?.optionResponse) {
      setValues(submission.optionResponse.fieldOptionIds.map((id) => id.toString()));
    }
  }, [submission?.optionResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md">
      <CheckboxGroup
        value={values}
        onChange={(keys) => {
          setValues(keys);
        }}
      >
        <VStack space="md">
          {options
            ?.sort((a, b) => a.order - b.order)
            .map((option, index) => (
              <Checkbox value={option.id.toString()} size="sm" key={index}>
                <CheckboxIndicator>
                  <CheckboxIcon as={Check} />
                </CheckboxIndicator>
                <CheckboxLabel>{option.label}</CheckboxLabel>
              </Checkbox>
            ))}
        </VStack>
      </CheckboxGroup>
    </VStack>
  );
};
