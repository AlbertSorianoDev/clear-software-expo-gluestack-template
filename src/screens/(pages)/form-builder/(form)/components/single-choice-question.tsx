import { Circle } from "lucide-react-native";
import { useState } from "react";

import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { VStack } from "@/screens/components/ui/vstack";

const options: { id: number; label: string }[] = [
  { id: 1, label: "asdaffds" },
  { id: 2, label: "uykuljy" },
];

export const SingleChoiceQuestion = () => {
  const [value, setValue] = useState("");
  return (
    <VStack space="md">
      <RadioGroup value={value} onChange={setValue}>
        {options.map((option, index) => (
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
