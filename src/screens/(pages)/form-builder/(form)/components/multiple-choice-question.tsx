import { Check } from "lucide-react-native";
import { useState } from "react";

import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/screens/components/ui/checkbox";
import { VStack } from "@/screens/components/ui/vstack";

const options: { id: number; label: string }[] = [
  { id: 1, label: "asdaffds" },
  { id: 2, label: "uykuljy" },
  { id: 3, label: "eigrhgrfn" },
];

export const MultipleChoiceQuestion = () => {
  const [values, setValues] = useState<string[]>([]);
  return (
    <VStack space="md">
      <CheckboxGroup
        value={values}
        onChange={(keys) => {
          setValues(keys);
        }}
      >
        <VStack space="md">
          {options.map((option, index) => (
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
